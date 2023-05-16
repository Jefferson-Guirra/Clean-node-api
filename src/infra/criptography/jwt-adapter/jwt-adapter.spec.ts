import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  sign: async (): Promise<string> => {
    return await Promise.resolve('any_id')
  }
}))
describe('Jwt Adapter', () => {
  test('should call sign with correct values', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'id' }, 'secret')
  })

  test('should  return a token on a sign success', async () => {
    const sut = new JwtAdapter('secret')
    const acessToken = await sut.encrypt('id')
    expect(acessToken).toBe('any_id')
  })

  test('should throw return if sign throws', async () => {
    const sut = new JwtAdapter('secret')
    jest.spyOn<any, string>(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.encrypt('id')
    await expect(promise).rejects.toThrow()
  })
})
