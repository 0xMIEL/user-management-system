import type { Request, Response } from 'express'
import type { CreationAttributes, WhereOptions } from 'sequelize'
import ServerError from '../errors/clientError.ts'
import ClientError from '../errors/serverError.ts'
import type User from '../models/user-model.ts'
import type { UpdatedUserAttributes } from '../models/user-model.ts'
import UserService from '../services/user-service.ts'

class UserController {
	static async getAll(req: Request, res: Response) {
		if (!req.accountId) throw new ServerError('Account ID is missing.')

		const { role } = req.query

		const filter: WhereOptions<User> = {}

		if (typeof role === 'string') {
			filter.role = role
		}

		const users = await UserService.getAll(req.accountId, filter)

		res.status(200).json(users)
	}

	static async getOne(req: Request, res: Response) {
		if (!req.accountId) throw new ServerError('Account ID is missing.')

		const { id } = req.params!

		if (!id) throw new ClientError('Missing id param!')

		const user = await UserService.getById(req.accountId, id)

		res.status(200).json(user)
	}

	static async createOne(req: Request, res: Response) {
		if (!req.accountId) throw new ServerError('Account ID is missing.')

		const { firstName, lastName, email, role } = req.body

		const creationAttributes: CreationAttributes<User> = {
			email: email,
			creatorId: req.accountId,
		}

		if (firstName) {
			creationAttributes.firstName = firstName
		}

		if (lastName) {
			creationAttributes.lastName = lastName
		}

		if (role) {
			creationAttributes.role = role
		}

		await UserService.create(creationAttributes)

		res.sendStatus(201)
	}

	static async updateOne(req: Request, res: Response) {
		if (!req.accountId) throw new ServerError('Account ID is missing.')

		const { id } = req.params

		if (!id) throw new ClientError('Missing id param!')

		const { firstName, lastName, role } = req.body

		const updatedAttributes: UpdatedUserAttributes = {}

		if (firstName) {
			updatedAttributes.firstName = firstName
		}

		if (lastName) {
			updatedAttributes.lastName = lastName
		}

		if (role) {
			updatedAttributes.role = role
		}

		await UserService.updateById(req.accountId, id, updatedAttributes)

		res.sendStatus(204)
	}

	static async deleteOne(req: Request, res: Response) {
		if (!req.accountId) throw new ServerError('Account ID is missing.')

		const { id } = req.params

		if (!id) throw new ClientError('Missing id param!')

		const isDeleted = await UserService.deleteById(req.accountId, id)

		if (!isDeleted) throw new ClientError('User does not exist.')

		res.sendStatus(204)
	}
}

export default UserController
