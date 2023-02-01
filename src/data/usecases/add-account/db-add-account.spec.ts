import { DbAddAccount } from './db-add-account'
import { Encrypter, AccountModel, AddAccountRepository, AddAccountModel } from './db-add-account-protocols'

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await Promise.resolve('hashed_password')
    }
  }
  return new EncrypterStub()
}

interface SutTypes {
  encrypterStub: Encrypter
  sut: DbAddAccount
  addAccountRepositoryStub: AddAccountRepository
}
const makeFakeAccountData = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password'
})
const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'hashed_password'
})

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountModel): Promise<AccountModel> {
      return await Promise.resolve(makeFakeAccount())
    }
  }
  return new AddAccountRepositoryStub()
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository()
  const encrypterStub = makeEncrypter()
  const dbAddAccount = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
  return {
    encrypterStub,
    sut: dbAddAccount,
    addAccountRepositoryStub
  }
}
describe('DbAddAccount UseCase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { encrypterStub, sut } = makeSut()
    const spyEncrypterStub = jest.spyOn(encrypterStub, 'encrypt')
    await sut.add(makeFakeAccountData())
    expect(spyEncrypterStub).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Encrypter throws', async () => {
    const { encrypterStub, sut } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(makeFakeAccountData())
    await expect(promise).rejects.toThrow()
  })
  test('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    await sut.add(makeFakeAccountData())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    })
  })

  test('should throw if Encrypter throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValue(Promise.reject(new Error()))
    const promise = sut.add(makeFakeAccountData())
    await expect(promise).rejects.toThrow()
  })

  test('should return an account if on success', async () => {
    const { sut } = makeSut()
    const promise = sut.add(makeFakeAccountData())
    const addAccount = await promise
    expect(addAccount).toEqual(makeFakeAccount())
  })
})
