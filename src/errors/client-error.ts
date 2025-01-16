import BaseError from './base-error.ts'

class ClientError extends BaseError {
	constructor(message: string, statusCode: number) {
		super(message, statusCode)
		this.statusCode = statusCode
		this.name = 'ClientError'
	}
}

export default ClientError
