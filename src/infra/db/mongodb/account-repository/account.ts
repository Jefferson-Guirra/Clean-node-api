import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection?.insertOne(accountData)
    const account = await accountCollection?.findOne({ _id: new ObjectId(result?.insertedId) })
    const id = account?._id.toString() as string
    return await new Promise(resolve => {
      resolve({
        name: account?.name,
        email: account?.email,
        password: account?.password,
        id
      })
    })
  }
}
