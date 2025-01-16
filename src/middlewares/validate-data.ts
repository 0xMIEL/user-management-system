import type { NextFunction, Request, Response } from 'express'
import type { ParamsDictionary, Query } from 'express-serve-static-core'
import { type ObjectSchema } from 'joi'

class Validator {
	private static handleValidation<T>(
		schema: ObjectSchema<T>,
		data: T,
		res: Response,
		next: NextFunction,
	): void {
		const { error } = schema.validate(data, { abortEarly: false })

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

	static validateBody<TBody>(schema: ObjectSchema<TBody>) {
		return (
			req: Request<{}, {}, TBody>,
			res: Response,
			next: NextFunction,
		): void => {
			Validator.handleValidation(schema, req.body, res, next)
		}
	}

	static validateParams<TParams extends ParamsDictionary>(
		schema: ObjectSchema<TParams>,
	) {
		return (req: Request<TParams>, res: Response, next: NextFunction): void => {
			Validator.handleValidation(schema, req.params, res, next)
		}
	}

	static validateQuery<TQuery extends Query>(schema: ObjectSchema<TQuery>) {
		return (
			req: Request<{}, {}, {}, TQuery>,
			res: Response,
			next: NextFunction,
		): void => {
			Validator.handleValidation(schema, req.query, res, next)
		}
	}
}

export default Validator
