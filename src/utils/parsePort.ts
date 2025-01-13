const parsePort = (port: string | undefined, defaultPort: number): number => {
	if (!port) return defaultPort

	if (typeof port !== 'number') throw TypeError('Invalid port type')

	return Number(port)
}

export default parsePort
