// The below copyright notice and the license permission notice
// shall be included in all copies or substantial portions.
// Copyright (C) 2016-2021 Yury Chetyrko <ychetyrko@gmail.com>
// License: https://raw.githubusercontent.com/nezaboodka/reactronic/master/LICENSE
// By contributing, you agree that your contributions will be
// automatically licensed under the license referred above.

import React from 'react'
import { ObservableObject, Transaction, unobservable, reaction, cached, isolatedRun, Reactronic as R, TraceOptions } from 'reactronic'

export function autorender(render: (cycle: number) => React.ReactElement | null, name?: string, trace?: Partial<TraceOptions>, tran?: Transaction): React.ReactElement {
  const [state, refresh] = React.useState<ReactState<React.ReactElement | null>>(
    (!name && !trace) ? createReactState : () => createReactState(name, trace))
  const rx = state.rx
  rx.cycle = state.cycle
  rx.refresh = refresh // just in case React will change refresh on each rendering
  React.useEffect(rx.unmount, [])
  return rx.render(render, tran) as React.ReactElement
}

// Internal

type ReactState<V> = { rx: Rx<V>, cycle: number }

class Rx<V> extends ObservableObject {
  @unobservable cycle: number = 0
  @unobservable refresh: (next: ReactState<V>) => void = nop
  @unobservable readonly unmount: () => (() => void)

  constructor() {
    super()
    this.cycle = 0
    this.refresh = nop
    this.unmount = (): (() => void) => {
      return (): void => { isolatedRun(R.dispose, this) }
    }
  }

  @cached
  render(emit: (cycle: number) => V, tran?: Transaction): V {
    return tran ? tran.inspect(() => emit(this.cycle)) : emit(this.cycle)
  }

  @reaction
  protected ensureUpToDate(): void {
    if (!R.getController(this.render).isUpToDate)
      isolatedRun(this.refresh, { rx: this, cycle: this.cycle + 1 })
  }

  static create<V>(hint: string | undefined, trace: TraceOptions | undefined): Rx<V> {
    const rx = new Rx<V>()
    if (hint)
      R.setTraceHint(rx, hint)
    if (trace) {
      R.getController(rx.render).configure({ trace })
      R.getController(rx.ensureUpToDate).configure({ trace })
    }
    return rx
  }
}

function createReactState<V>(name?: string, trace?: Partial<TraceOptions>): ReactState<V> {
  const hint = name || (R.isTraceEnabled ? getComponentName() : '<rx>')
  const rx = Transaction.runAs<Rx<V>>({ hint, trace }, Rx.create, hint, trace)
  return { rx, cycle: 0 }
}

function nop(...args: any[]): void {
  // do nothing
}

function getComponentName(): string {
  const restore = Error.stackTraceLimit = 20
  const error = new Error()
  const stack = error.stack || ''
  Error.stackTraceLimit = restore
  const lines = stack.split('\n')
  const i = lines.findIndex(x => x.indexOf(reaction.name) >= 0) || 6
  let result: string = lines[i + 1] || ''
  result = (result.match(/^\s*at\s*(\S+)/) || [])[1]
  return result !== undefined ? `<${result}>` : '<Rx>'
}
