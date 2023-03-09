import { InvalidParamsError } from '../../errors'
import { Validation } from './validation'

export class CompareFieldsValidation implements Validation {
  constructor (
    private readonly field: string,
    private readonly fieldToCompareName: string
  ) {}

  validate (input: any): Error | undefined {
    if (input[this.field] !== input[this.fieldToCompareName]) {
      return new InvalidParamsError(this.fieldToCompareName)
    }
  }
}
