import { Validation } from '../../protocols/validation'
import { EmailValidator } from '../../protocols/email-validator'
import { InvalidParamsError } from '../../errors'
export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: any): Error | undefined {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamsError(this.fieldName)
    }
  }
}
