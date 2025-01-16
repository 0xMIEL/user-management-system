class ServerError extends Error {
	devMsg: string | null

	constructor(
		devMsg: string | null = null,
		message: string = 'Internal Server Error',
	) {
		super(message)
		this.devMsg = devMsg
	}
}

export default ServerError
