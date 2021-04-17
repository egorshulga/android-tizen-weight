import { range } from 'common/array'
import { ObservableObject, transaction, unobservable } from 'reactronic'

export class Weight extends ObservableObject {
  @unobservable readonly integerValues: number[]
  @unobservable readonly integerPickerValues: string[]
  @unobservable readonly decimalValues: number[]
  @unobservable readonly decimalPickerValues: string[]

  private _value: number = 60.9

  get value(): number { return Math.round(this._value * 10) / 10 }
  set value(value: number) { this._value = value }

  constructor() {
    super()
    this.integerValues = range(0, 150)
    this.integerPickerValues = this.integerValues.map(x => x.toString())
    this.decimalValues = range(0, 9)
    this.decimalPickerValues = this.decimalValues.map(x => x.toString())
  }

  get integerIndex(): number { return Math.floor(this.value) }
  get decimalIndex(): number { return Math.round((this.value - Math.floor(this.value)) * 10) }
  get decimal(): number { return Math.round((this.value - Math.floor(this.value)) * 10) / 10  }

  incrementInteger(): void {
    this.value += 1
  }

  @transaction
  decrementInteger(): void {
    this.value -= 1
  }

  @transaction
  incrementDecimal(): void {
    this.value += 0.1
  }

  @transaction
  decrementDecimal(): void {
    this.value -= 0.1
  }
}
