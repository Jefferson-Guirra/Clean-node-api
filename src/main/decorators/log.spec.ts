import { LogControllerDecorator } from './log'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

describe('Log Controller Decorator', () => {
  test('Should call controller handler', async () => {
    class ControllerStub implements Controller {
      async handle (httpRequest: HttpRequest): Promise<HttpResponse | undefined> {
        const fakeAccount: HttpResponse = {
          statusCode: 200,
          body: {
            name: 'any_name',
            email: 'any_email@mail.com',
            password: 'any_password',
            passwordConfirmation: 'any_password'
          }
        }
        return await Promise.resolve(fakeAccount)
      }
    }
    const controllerStub = new ControllerStub()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const sut = new LogControllerDecorator(controllerStub)
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }

    }
    await sut.handle(httpRequest)
    expect(handleSpy).toBeCalledWith(httpRequest)
  })
})
