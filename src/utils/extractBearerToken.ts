const bearerReqexp =
	/^Bearer\s([a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+)$/

const extractBearerToken = (authHeader: string): string | null => {
	const match = authHeader.match(bearerReqexp)

	if (!match || !match[1]) return null

	return match[1]
}

export default extractBearerToken
