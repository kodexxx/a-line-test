import BaseLogicError from '@Server/errors/logic/BaseLogicError'

export default class InternalLogicError extends BaseLogicError {
  constructor(message: string) {
    super(message, 1002)
  }
}
