import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route'
import { makeSignUpController } from '../factories/signup/signup-factory'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/signup', adaptRoute(makeSignUpController()))
}
