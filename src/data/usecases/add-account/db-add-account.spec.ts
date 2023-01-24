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

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: 'hashed_password'
      }
      return await Promise.resolve(fakeAccount)
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
    const account: AccountModel = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
      id: 'valid_id'

    }
    await sut.add(account)
    expect(spyEncrypterStub).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Encrypter throws', async () => {
    const { encrypterStub, sut } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(Promise.reject(new Error()))
    const account: AccountModel = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
      id: 'valid_id'
    }
    const promise = sut.add(account)
    await expect(promise).rejects.toThrow()
  })
  test('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    const account = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    }
    await sut.add(account)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    })
  })

  test('should throw if Encrypter throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValue(Promise.reject(new Error()))

    const account = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    }
    const promise = sut.add(account)
    await expect(promise).rejects.toThrow()
  })

  test('should return an account if on success', async () => {
    const { sut } = makeSut()

    const account = {
      name: 'valid_name',
      email: 'valid_email',
      id: 'valid_id',
      password: 'hashed_password'
    }
    const promise = sut.add(account)
    const addAccount = await promise
    expect(addAccount).toEqual(account)
  })
})
