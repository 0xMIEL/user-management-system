import ServerError from '../errors/server-error.ts'

const parsePort = (port: string | undefined, defaultPort: number): number => {
	if (!port) return defaultPort

	if (Number.isNaN(port)) throw new ServerError('Invalid port type.')

	return Number(port)
}

export default parsePort
