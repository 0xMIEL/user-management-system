const parsePort = (port: string | undefined, defaultPort: number): number => {
	if (!port) return defaultPort

	if (Number.isNaN(port)) throw TypeError('Invalid port type')

	return Number(port)
}

export default parsePort
