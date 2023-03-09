import { ValidationComposite } from './validation-composite'
import { Validation } from './validation'
import { InvalidParamsError } from '../../errors'

const makeValidationStub = (): Validation => {
  class CompareFieldStub implements Validation {
    constructor (
      private readonly field: string,
      private readonly fieldToCompare: string
    ) {}

    validate (input: any): Error | undefined {
      return undefined
    }
  }
  return new CompareFieldStub('field', 'fieldToCompare')
}
interface SutTypes {
  validationStub: Validation
  sut: Validation
}
const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const sut = new ValidationComposite([validationStub])
  return {
    validationStub,
    sut
  }
}
describe('ValidationComposite', () => {
  test('should return an error if any validation fails', () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new InvalidParamsError('field'))
    const error = sut.validate({ field: 'any_field' })
    expect(error).toEqual(new InvalidParamsError('field'))
  })
})
