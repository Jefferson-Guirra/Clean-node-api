import { Authentication } from '../../../domain/usecases/authentication'
import { MissingParamsError, InvalidParamsError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse | undefined> {
    try {
      const { email, password } = httpRequest.body
      const requiredFields = ['password', 'email']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamsError(field))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamsError('email'))
      }
      await this.authentication.auth(email, password)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
