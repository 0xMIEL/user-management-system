import type { NextFunction, Request, Response } from 'express'

const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	res.status(400).json(err)
}

export default errorHandler
