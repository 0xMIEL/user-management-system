import type { NextFunction, Request, Response } from 'express'
import ClientError from '../errors/serverError.ts'

const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (err instanceof ClientError)
		return res.status(400).json({
			status: 'error',
			message: err.message,
		})
	
	return res.sendStatus(400)
}

export default errorHandler
