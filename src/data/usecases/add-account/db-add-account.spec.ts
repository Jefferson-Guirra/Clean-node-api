import { AccountModel } from '../../../domain/models/account'
import { DbAccount } from './db-add-account'
import { Encrypter } from './protocols/encrypter'

interface SutTypes {
  encrypterStub: Encrypter
  sut: DbAccount
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypter (value: string): Promise<string> {
      return await Promise.resolve('hashedValue')
    }
  }
  return new EncrypterStub()
}
const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const dbAddAccount = new DbAccount(encrypterStub)
  return {
    encrypterStub,
    sut: dbAddAccount
  }
}
describe('DbAddAccount UseCase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { encrypterStub, sut } = makeSut()
    const spyEncrypterStub = jest.spyOn(encrypterStub, 'encrypter')
    const account: AccountModel = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.add(account)
    expect(spyEncrypterStub).toHaveBeenCalledWith('valid_password')
  })
})
