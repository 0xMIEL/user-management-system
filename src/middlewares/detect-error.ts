import type { NextFunction, Request, RequestHandler, Response } from 'express'

const detectError = <T = unknown>(cb: RequestHandler): RequestHandler => {
	return async (req: Request<{}, {}, T>, res: Response, next: NextFunction) => {
		try {
			await cb(req, res, next)
		} catch (error) {
			next(error)
		}
	}
}

export default detectError
