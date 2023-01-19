import { Encrypter, AccountModel, AddAccount, AddAccountModel } from './db-add-account-protocols'
export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const { password } = account
    await this.encrypter.encrypter(password)
    return await Promise.resolve({ name: 'ekad', email: 'ejdnedkm', password })
  }
}
