import {
  UpdateAccessTokenRepository,
  AuthenticationModel,
  Authentication,
  TokenGenerator,
  LoadAccountByEmailRepository,
  HashComparer
} from './db-authentication-protocols'
export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    const validateAccount = account !== null && await this.hashComparer.compare(authentication.password, account.password)
    if (validateAccount) {
      const accessToken = await this.tokenGenerator.generate(account.id)
      await this.updateAccessTokenRepository.update(account.id, accessToken)
      return await Promise.resolve(accessToken)
    } else {
      return null
    }
  }
}
