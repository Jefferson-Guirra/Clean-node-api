import { MissingParamsError } from '../../errors'
import { Validation } from './validation'

export class RequiredFieldsValidation implements Validation {
  constructor (
    private readonly fieldName: string
  ) {}

  validate (input: any): Error | undefined {
    if (!input[this.fieldName]) {
      return new MissingParamsError(this.fieldName)
    }
  }
}
