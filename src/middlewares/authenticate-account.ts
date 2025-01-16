import type { NextFunction, Request, Response } from 'express'
import JWT from 'jsonwebtoken'
import GLOBAL_OPTIONS from '../configs/global-options.ts'
import ServerError from '../errors/clientError.ts'
import ClientError from '../errors/serverError.ts'
import extractBearerToken from '../utils/extractBearerToken.ts'

let authenticateAccount = (req: Request, res: Response, next: NextFunction) => {
	try {
		const { authorization } = req.headers

		if (!authorization)
			throw new ClientError('Authorization header is missing.')

		const token = extractBearerToken(authorization)

		if (!token) throw new ClientError('Bearer token is missing or malformed.')

		const tokenPayload = JWT.verify(token, GLOBAL_OPTIONS.JWT_SECRET)

		if (typeof tokenPayload !== 'object')
			throw new ServerError('Invalid token payload format.')

		const { accountId } = tokenPayload

		if (!accountId) throw new ServerError('Token does not contain accountId.')

		req.accountId = accountId

		next()
	} catch (error) {
		next(error)
	}
}

export default authenticateAccount
