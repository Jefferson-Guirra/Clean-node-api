import { MissingParamsError } from '../errors/missing-params-error'
import { HttpRequest, HttpResponse } from '../protocols/http'
export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamsError('name')
      }
    } else {
      return {
        statusCode: 400,
        body: new MissingParamsError('email')
      }
    }
  }
}
