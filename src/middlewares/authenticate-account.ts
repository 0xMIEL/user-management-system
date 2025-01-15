import type { NextFunction, Request, Response } from 'express'
import JWT from 'jsonwebtoken'
import GLOBAL_OPTIONS from '../configs/global-options.ts'
import extractBearerToken from '../utils/extractBearerToken.ts'
import detectError from './detect-error.ts'

let authenticateAccount = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { authorization } = req.headers

	if (!authorization) throw new Error() // client

	const token = extractBearerToken(authorization)

	if (!token) throw new Error() // client

	const tokenPayload = JWT.verify(token, GLOBAL_OPTIONS.JWT_SECRET)

	if (typeof tokenPayload !== 'object') throw new Error() // internal

	const { accountId } = tokenPayload

	if (!accountId) throw new Error() // internal

	req.accountId = accountId

	next()
}

authenticateAccount = detectError(authenticateAccount)

export default authenticateAccount
