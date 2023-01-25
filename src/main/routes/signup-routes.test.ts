import request from 'supertest'
import app from '../config/app'
describe('SignUp Routes', () => {
  test('should first', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'jefferson',
        email: 'jeffersonloop14@mail.com',
        password: '123',
        passwordConformation: '123'
      })
      .expect(200)
  })
})
