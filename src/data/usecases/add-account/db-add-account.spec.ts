import { DbAccount } from './db-add-account'
import { Encrypter } from './protocols/encrypter'
describe('DbAddAccount UseCase', () => {
  test('Should call Encrypter with correct password', async () => {
    class EncrypterStub implements Encrypter {
      async encrypter (value: string): Promise<string> {
        return await Promise.resolve('hashed_password')
      }
    }
    const encrypterStub = new EncrypterStub()
    const sut = new DbAccount(encrypterStub)
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypter')
    const accountData = {
      name: 'valid_name',
      email: 'valid_mail@mail.com',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
