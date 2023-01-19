import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account'
import { Encrypter } from './protocols/encrypter'
import { AccountModel } from '../../../domain/models/account'
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
