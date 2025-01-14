import type { NextFunction, Request, RequestHandler, Response } from 'express'

const asyncWrapper = (cb: RequestHandler) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await cb(req, res, next)
		} catch (error) {
			next(error)
		}
	}
}


export default asyncWrapper