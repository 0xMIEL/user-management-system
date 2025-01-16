import type { NextFunction, Request, RequestHandler, Response } from 'express'
import type { ParamsDictionary, Query } from 'express-serve-static-core'

const detectError = <
	TBody,
	TParams extends ParamsDictionary = ParamsDictionary,
	TQuery extends Query = Query,
>(
	cb: RequestHandler,
) => {
	return async (
		req: Request<TParams, {}, TBody, TQuery>,
		res: Response,
		next: NextFunction,
	) => {
		try {
			await cb(req, res, next)
		} catch (error) {
			next(error)
		}
	}
}

export default detectError
