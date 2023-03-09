import { ValidationComposite } from './validation-composite'
import { Validation } from './validation'
import { InvalidParamsError } from '../../errors'

const makeValidation = (): Validation => {
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
  validationStubs: Validation[]
  sut: ValidationComposite
}
const makeSut = (): SutTypes => {
  const validationStubs = [makeValidation(), makeValidation()]
  const sut = new ValidationComposite(validationStubs)
  return {
    validationStubs,
    sut
  }
}
describe('ValidationComposite', () => {
  test('should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new InvalidParamsError('field'))
    const error = sut.validate({ field: 'any_field' })
    expect(error).toEqual(new InvalidParamsError('field'))
  })
  test('should return the first error if more the one validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new InvalidParamsError('name'))
    const error = sut.validate(validationStubs)
    expect(error).toEqual(new Error())
  })
})
