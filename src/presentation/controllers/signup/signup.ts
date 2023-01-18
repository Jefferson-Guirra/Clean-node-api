import { InvalidParamsError, MissingParamsError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http-helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse, AddAccount } from './signup-protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse | undefined> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamsError(field))
        }
      }
      const { email, password, passwordConfirmation, name } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamsError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isvalid(email)
      if (!isValid) {
        return badRequest(new InvalidParamsError('email'))
      }
      const account = await this.addAccount.add({
        email,
        password,
        name
      })
      return ok(account)
    } catch (err) {
      console.error(err)
      return serverError()
    }
  }
}
