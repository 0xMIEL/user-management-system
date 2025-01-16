import type {
	ErrorRequestHandler,
	NextFunction,
	Request,
	Response,
} from 'express'
import JWT from 'jsonwebtoken'
import { UniqueConstraintError } from 'sequelize'
import ServerError from '../errors/clientError.ts'
import ClientError from '../errors/serverError.ts'

const errorHandler: ErrorRequestHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (
		err instanceof ClientError ||
		err instanceof JWT.JsonWebTokenError ||
		err instanceof JWT.TokenExpiredError
	) {
		res.status(400).json({
			status: 'error',
			message: err.message,
		})
		return
	}

	if (err instanceof UniqueConstraintError) {
		res.status(400).json({
			status: 'error',
			message: err.errors[0]?.message,
		})
		return
	}

	if (err instanceof ServerError) {
		if (process.env.NODE_ENV === 'development') {
			res.status(500).json({
				status: 'devError',
				message: err.devMsg,
			})
			return
		}
	}

	if (err instanceof SyntaxError) {
		res.status(400).json({
			status: 'error',
			message: 'Body JSON syntax error.',
		})
		return
	}

	res.status(500).json({
		status: 'error',
		message: 'Internal error.',
	})
}

export default errorHandler
