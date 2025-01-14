import type { UUID } from 'crypto'
import type { NextFunction, Request, Response } from 'express'
import JWT from 'jsonwebtoken'
import GLOBAL_OPTIONS from '../configs/global-options.ts'
import AuthorizationError from '../errors/authorization-error.ts'
import parseToken from '../utils/parseToken.ts'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const { authorization } = req.headers

	if (!authorization)
		throw new AuthorizationError('Missing authorization header.')

	const token = parseToken(authorization)
	const jwtPayload = JWT.verify(token, GLOBAL_OPTIONS.JWT_SECRET)
	let userId: UUID

	if (typeof jwtPayload === 'object' && 'id' in jwtPayload) {
		userId = jwtPayload.id
	} else {
		throw new AuthorizationError('Invalid token payload or missing ID.')
	}

	req.userId = userId

	next()
}

export default authMiddleware
