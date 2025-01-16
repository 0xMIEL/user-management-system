import STATUS_CODES from '../configs/status-codes.ts'
import BaseError from './base-error.ts'

class ServerError extends BaseError {
	devMessage: string

	constructor(
		devMessage: string,
		statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR,
		message = 'Internal Server Error',
	) {
		super(message, statusCode)
		this.name = 'ServerError'
		this.devMessage = devMessage
	}
}

export default ServerError
