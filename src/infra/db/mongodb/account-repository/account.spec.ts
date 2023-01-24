import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'
const url = process.env.MONGO_URL as string

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}
describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(url)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  test('Should return an account on success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(account.name).toBe('any_name')
    expect(account.password).toBe('any_password')
    expect(account.email).toBe('any_email@mail.com')
  })
})
