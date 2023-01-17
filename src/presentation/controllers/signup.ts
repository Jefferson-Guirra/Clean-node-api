import { MissingParamsError } from '../errors/missing-params-error'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { badRequest } from '../helpers/http-helper'
export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamsError('name'))
    } else {
      return badRequest(new MissingParamsError('email'))
    }
  }
}
