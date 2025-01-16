import type { NextFunction, Request, Response } from 'express'
import { type ObjectSchema } from 'joi'
import type { ParamsDictionary, Query } from 'express-serve-static-core'


export const validateBody = <TBody>(schema: ObjectSchema<TBody>) => {
	return (
		req: Request<{}, {}, TBody>,
		res: Response,
		next: NextFunction,
	): void => {
		const { error } = schema.validate(req.body, { abortEarly: false })

		if (error) {
			const errorDetails = error.details.map(detail => detail.message)

			res.status(400).json({
				status: 'error',
				message: 'Validation failed.',
				errors: errorDetails,
			})

			return
		}

		next()
	}
}

export const validateParams = <TParams extends ParamsDictionary>(schema: ObjectSchema<TParams>) => {
	return (req: Request<TParams>, res: Response, next: NextFunction): void => {
		const { error } = schema.validate(req.params, { abortEarly: false })

		if (error) {
			const errorDetails = error.details.map(detail => detail.message)

			res.status(400).json({
				status: 'error',
				message: 'Validation failed.',
				errors: errorDetails,
			})

			return
		}

		next()
	}
}

export const queryQuery = <TQuery extends Query>(schema: ObjectSchema<TQuery>) => {
	return (
		req: Request<{}, {}, {}, TQuery>,
		res: Response,
		next: NextFunction,
	): void => {
		const { error } = schema.validate(req.query, { abortEarly: false })

		if (error) {
			const errorDetails = error.details.map(detail => detail.message)

			res.status(400).json({
				status: 'error',
				message: 'Validation failed.',
				errors: errorDetails,
			})

			return
		}

		next()
	}
}
