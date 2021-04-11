import { range } from 'common/array'
import { ObservableObject, unobservable } from 'reactronic'

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

  get integer(): number { return Math.floor(this.value) }
  get decimalIndex(): number { return Math.floor((this.value - this.integer) * 10) }
  get decimal(): number { return Math.floor((this.value - this.integer) * 10) / 10 }
}
