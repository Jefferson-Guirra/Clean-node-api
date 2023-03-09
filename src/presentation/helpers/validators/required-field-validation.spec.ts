import { MissingParamsError } from '../../errors'
import { RequiredFieldsValidation } from './required-field-validation'
const makeSut = (): RequiredFieldsValidation => {
  return new RequiredFieldsValidation('field')
}
describe('RequiredField Validation', () => {
  test('should return MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamsError('field'))
  })
  test('should return if validation success', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_field' })
    expect(error).toBeFalsy()
  })
})
