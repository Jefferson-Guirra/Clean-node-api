import { EmailValidatorAdapter } from './email-validator'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

describe('EmailValidator', () => {
  test('should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })
})

test('should return true if validator return true', () => {
  const sut = new EmailValidatorAdapter()
  const isValid = sut.isValid('valid_mail@gmail.com')
  expect(isValid).toEqual(true)
})

test('should call validator with correct email', () => {
  const sut = new EmailValidatorAdapter()
  const isEmailSpy = jest.spyOn(validator, 'isEmail')
  sut.isValid('any_mail@gmail.com')
  expect(isEmailSpy).toBeCalledWith('any_mail@gmail.com')
})
