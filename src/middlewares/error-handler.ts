import type { NextFunction, Request, Response } from 'express'

const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	res.sendStatus(400)
}

export default errorHandler
