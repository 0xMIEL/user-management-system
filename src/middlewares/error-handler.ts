import type {
	ErrorRequestHandler,
	NextFunction,
	Request,
	Response,
} from 'express'
import JWT from 'jsonwebtoken'
import { UniqueConstraintError } from 'sequelize'
import GLOBAL_OPTIONS from '../configs/global-options.ts'
import STATUS_CODES from '../configs/status-codes.ts'
import ClientError from '../errors/client-error.ts'
import ServerError from '../errors/server-error.ts'

const errorHandler: ErrorRequestHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (err instanceof ClientError) {
		res.status(err.statusCode).json({
			status: 'error',
			message: err.message,
		})

		return
	}

	if (err instanceof UniqueConstraintError) {
		res.status(STATUS_CODES.BAD_REQUEST).json({
			status: 'error',
			message: err.errors[0]?.message,
		})

		return
	}

	if (
		err instanceof JWT.JsonWebTokenError ||
		err instanceof JWT.TokenExpiredError
	) {
		res.status(STATUS_CODES.UNAUTHORIZED).json({
			status: 'error',
			message: err.message,
		})

		return
	}

	if (err instanceof SyntaxError) {
		res.status(STATUS_CODES.BAD_REQUEST).json({
			status: 'error',
			message: 'Body JSON syntax error.',
		})
		return
	}

	if (err instanceof ServerError) {
		let message = err.message

		if (GLOBAL_OPTIONS.DEV_MODE) {
			message = err.devMessage
		}

		res.status(err.statusCode).json({
			status: 'error',
			message,
		})

		return
	}

	res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
		status: 'error',
		message: 'Internal server error.',
	})
}

export default errorHandler
