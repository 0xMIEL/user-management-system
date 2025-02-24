class BaseError extends Error {
	statusCode: number

	constructor(message: string, statusCode: number) {
		super(message)
		this.name = 'BaseError'
		this.statusCode = statusCode
	}
}

export default BaseError
