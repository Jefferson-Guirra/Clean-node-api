import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  hash: async (Value: string, salt: number): Promise<string> => {
    return await Promise.resolve('hash')
  },
  compare: async (): Promise<boolean> => {
    return await Promise.resolve(true)
  }

}))
const salt = 12

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}
describe('Bcrypt Adapter', () => {
  test('Should call hash with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
  test('Should return a valid hash on hash success', async () => {
    const sut = makeSut()
    const hash = await sut.hash('any_value')
    expect(hash).toEqual('hash')
  })

  test('Should throw if bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn<any, string>(bcrypt, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const hash = sut.hash('any_value')
    await expect(hash).rejects.toThrow()
  })

  test('should call compare with correct values', async () => {
    const sut = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'hash_value')
    expect(compareSpy).toBeCalledWith('any_value', 'hash_value')
  })

  test('should return true when compare succeeds', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'hash_value')
    expect(isValid).toBe(true)
  })

  test('should return false when compare fails', async () => {
    const sut = makeSut()
    jest.spyOn<any, string>(bcrypt, 'compare').mockReturnValueOnce(Promise.resolve(false))
    const isValid = await sut.compare('any_value', 'hash_value')
    expect(isValid).toBe(false)
  })
})
