import {
  UpdateAccessTokenRepository,
  AuthenticationModel,
  Authentication,
  Encrypter,
  LoadAccountByEmailRepository,
  HashComparer
} from './db-authentication-protocols'
export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account !== null) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.update(account.id, accessToken)
        return await Promise.resolve(accessToken)
      }
    }
    return null
  }
}
