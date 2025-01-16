import type { NextFunction, Request, Response } from 'express'
import { type ObjectSchema } from 'joi'

const validateData = (
	dataLocation: 'body' | 'params' | 'query',
	schema: ObjectSchema,
) => {
	return (req: Request, res: Response, next: NextFunction): void => {
		const { error } = schema.validate(req[dataLocation], { abortEarly: false })

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

export default validateData
