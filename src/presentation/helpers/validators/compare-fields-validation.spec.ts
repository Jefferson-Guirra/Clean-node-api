import { InvalidParamsError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'
const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fieldToCompare')
}
describe('CompareFieldValidation', () => {
  test('should return a InvalidParamsError if Validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value', fieldToCompare: 'wrong_any' })
    expect(error).toEqual(new InvalidParamsError('fieldToCompare'))
  })
  test('should not return if Validation success', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value', fieldToCompare: 'any_value' })
    expect(error).toBeFalsy()
  })
})
