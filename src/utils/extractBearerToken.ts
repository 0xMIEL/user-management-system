import GLOBAL_OPTIONS from '../configs/global-options.ts'

const extractBearerToken = (authHeader: string): string | null => {
	const match = authHeader.match(GLOBAL_OPTIONS.BEARER_REGEXP)

	if (!match || !match[1]) return null

	return match[1]
}

export default extractBearerToken
