import env from './config/env'
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => {
      function test (): void {
        console.log('testudo tsx')
      }
      test()
    })
  }).catch(console.error)
