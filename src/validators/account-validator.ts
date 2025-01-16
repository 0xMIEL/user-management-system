import Joi, { type ObjectSchema } from 'joi'

export interface RegisterRequestBody {
	login: string
	password: string
}

export interface LoginRequestBody {
	login: string
	password: string
}

export interface DeregisterRequestBody {
	password: string
}

const login = Joi.string()
	.min(4)
	.max(15)
	.pattern(/^[A-Za-z0-9_-]+$/)
	.required()
	.messages({
		'string.base': 'Login must be a string.',
		'string.empty': 'Login cannot be empty.',
		'string.min': 'Login must be at least 4 characters long.',
		'string.max': 'Login cannot exceed 15 characters.',
		'string.pattern.base':
			'Login can only contain letters, numbers, underscores (_), and hyphens (-).',
		'any.required': 'Login is required.',
	})

const password = Joi.string()
	.min(8)
	.max(24)
	.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
	.required()
	.messages({
		'string.base': 'Password must be a string.',
		'string.empty': 'Password cannot be empty.',
		'string.min': 'Password must be at least 8 characters long.',
		'string.max': 'Password cannot exceed 24 characters.',
		'string.pattern.base':
			'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).',
		'any.required': 'Password is required.',
	})

class AccountValidator {
	static registerBodySchema: ObjectSchema<RegisterRequestBody> = Joi.object({
		login,
		password,
	})
		.required()
		.unknown(false)
		.messages({
			'object.base': 'Registration data must be an object.',
			'object.unknown': 'Unknown fields found in registration data.',
			'any.required': 'Registration data is required.',
		})

	static loginBodySchema: ObjectSchema<LoginRequestBody> = Joi.object({
		login,
		password,
	})
		.required()
		.unknown(false)
		.messages({
			'object.base': 'Login data must be an object.',
			'object.unknown': 'Unknown fields found in login data.',
			'any.required': 'Login data is required.',
		})

	static deregisterBodySchema: ObjectSchema<DeregisterRequestBody> = Joi.object(
		{
			password,
		},
	)
		.required()
		.unknown(false)
		.messages({
			'object.base': 'Deregistration data must be an object.',
			'object.unknown': 'Unknown fields found in deregistration data.',
			'any.required': 'Deregistration data is required.',
		})
}

export default AccountValidator
