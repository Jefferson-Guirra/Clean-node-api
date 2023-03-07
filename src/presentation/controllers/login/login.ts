import { MissingParamsError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse | undefined> {
    return await Promise.resolve(badRequest(new MissingParamsError('email')))
  }
}
