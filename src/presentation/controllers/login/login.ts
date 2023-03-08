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
      if (!password) {
        return await Promise.resolve(badRequest(new MissingParamsError('password')))
      }
      if (!email) {
        return await Promise.resolve(badRequest(new MissingParamsError('email')))
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return await Promise.resolve(badRequest(new InvalidParamsError('email')))
      }
      await this.authentication.auth(email, password)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
