import { range } from 'common/array'
import { ObservableObject, transaction, unobservable } from 'reactronic'

export class Weight extends ObservableObject {
  @unobservable readonly integerValues: number[]
  @unobservable readonly integerPickerValues: string[]
  @unobservable readonly decimalValues: number[]
  @unobservable readonly decimalPickerValues: string[]

  value: number = 60.9

  constructor() {
    super()
    this.integerValues = range(0, 150)
    this.integerPickerValues = this.integerValues.map(x => x.toString())
    this.decimalValues = range(0, 9)
    this.decimalPickerValues = this.decimalValues.map(x => x.toString())
  }

  get integer(): number { return Math.floor(Math.round(this.value * 10) / 10) }
  get decimalIndex(): number { return Math.round((this.value - Math.floor(this.value)) * 10) }
  get decimal(): number { return Math.round((this.value - Math.floor(this.value)) * 10) / 10 }

  @transaction
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

  @transaction
  setInteger(value: number): void {
    const decimal = this.decimal
    this.value = value + decimal
  }

  @transaction
  setDecimal(value: number): void {
    const integer = this.integer
    this.value = integer + value / 10
  }
}
