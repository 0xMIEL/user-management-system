class ClientError extends Error {
	constructor(message: string = 'Bad request') {
		super(message)
	}
}

export default ClientError
