import { MissingParamsError, InvalidParamsError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse | undefined> {
    if (!httpRequest.body.password) {
      return await Promise.resolve(badRequest(new MissingParamsError('password')))
    }
    if (!httpRequest.body.email) {
      return await Promise.resolve(badRequest(new MissingParamsError('email')))
    }
    const isValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!isValid) {
      return await Promise.resolve(badRequest(new InvalidParamsError('email')))
    }
  }
}
