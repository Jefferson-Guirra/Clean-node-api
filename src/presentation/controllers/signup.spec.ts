import { SignUpController } from './signup'
import { MissingParamsError } from '../errors/missing-params-error'
import { HttpResponse } from '../protocols/http'

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest) as HttpResponse
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamsError('name'))
  })
  test('Should return 400 if no email is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest) as HttpResponse
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamsError('email'))
  })
  test('Should return 400 if no password is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest) as HttpResponse
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamsError('password'))
  })
})
