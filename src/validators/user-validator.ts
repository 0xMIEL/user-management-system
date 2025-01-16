import type { UUID } from 'crypto'
import type { ParamsDictionary, Query } from 'express-serve-static-core'
import Joi, { type ObjectSchema } from 'joi'

export interface BasicParamsSchema extends ParamsDictionary {
	id: UUID
}

export interface GetAllQuerySchema extends Query {
	role?: string
}

export interface CreateOneBodySchema {
	firstName?: string
	lastName?: string
	email: string
	role?: string
}

export type UpdateOneBodySchema = Omit<CreateOneBodySchema, 'email'>


const id = Joi.string().uuid().required().messages({
	'any.required': 'ID is required.',
	'string.uuid': 'ID must be a valid UUID.',
})

const firstName = Joi.string()
	.pattern(/^[A-Za-z\s]+$/)
	.max(50)
	.messages({
		'string.pattern.base': 'First name can only contain letters and spaces.',
		'string.empty': 'First name cannot be empty.',
		'string.max': 'First name cannot exceed 50 characters.',
	})
	.optional()
	.allow(null)

const lastName = Joi.string()
	.pattern(/^[A-Za-z\s]+$/)
	.max(50)
	.messages({
		'string.pattern.base': 'Last name can only contain letters and spaces.',
		'string.empty': 'Last name cannot be empty.',
		'string.max': 'Last name cannot exceed 50 characters.',
	})
	.optional()
	.allow(null)

const email = Joi.string().email().required().messages({
	'string.email': 'Email must be a valid email address.',
	'string.empty': 'Email cannot be empty.',
	'any.required': 'Email is required.',
})

const role = Joi.string().valid('user', 'admin').default('user').messages({
	'any.only': 'Role must be either "user" or "admin".',
})

class UserValidator {
	static basicParamsSchema: ObjectSchema<BasicParamsSchema> = Joi.object({
		id,
	})
		.required()
		.unknown(false)
		.messages({
			'object.base': 'Parameters must be an object.',
			'object.unknown': 'Unknown parameters provided.',
			'any.required': 'Parameters are required.',
		})

	static getAllQuerySchema: ObjectSchema<GetAllQuerySchema> = Joi.object({
		role,
	})
		.required()
		.unknown(false)
		.messages({
			'object.base': 'Query parameters must be an object.',
			'object.unknown': 'Unknown query parameters provided.',
			'any.required': 'Query parameters are required.',
		})

	static createOneBodySchema: ObjectSchema<CreateOneBodySchema> = Joi.object({
		firstName,
		lastName,
		email,
		role,
	})
		.required()
		.unknown(false)
		.messages({
			'object.base': 'Request body must be an object.',
			'object.unknown': 'Unknown fields found in request body.',
			'any.required': 'Request body is required.',
		})

	static updateOneBodySchema: ObjectSchema<UpdateOneBodySchema> = Joi.object({
		firstName,
		lastName,
		role,
	})
		.required()
		.unknown(false)
		.messages({
			'object.base': 'Request body must be an object.',
			'object.unknown': 'Unknown fields found in request body.',
			'any.required': 'Request body is required.',
		})
}

export default UserValidator