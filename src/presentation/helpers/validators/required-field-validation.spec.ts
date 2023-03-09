import { MissingParamsError } from '../../errors'
import { RequiredFieldsValidation } from './required-field-validation'
describe('RequiredField Validation', () => {
  test('should return MissingParamError if validation fails', () => {
    const sut = new RequiredFieldsValidation('field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamsError('field'))
  })
})
