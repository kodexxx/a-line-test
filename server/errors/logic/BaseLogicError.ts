export default class BaseLogicError extends Error {
  public errorCode: number

  constructor(message: string, errorCode: number) {
    super(message)

    this.errorCode = errorCode
  }
}
