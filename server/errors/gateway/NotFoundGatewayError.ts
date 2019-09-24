import BaseGatewayError from '@Server/errors/gateway/BaseGatewayError'

export default class NotFoundGatewayError extends BaseGatewayError {
  constructor(message: string) {
    super(message, 404)
  }
}
