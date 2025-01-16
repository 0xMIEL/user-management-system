import type { UUID } from 'crypto'
import {
	type CreationAttributes,
	type FindOptions,
	type WhereOptions,
} from 'sequelize'
import User, { type UpdatedUserAttributes } from '../models/user-model.ts'

class UserService {
	static async getAll(
		creatorId: UUID,
		whereOptions?: WhereOptions<User>,
	): Promise<User[]> {
		const findOptions: FindOptions<User> = {
			where: { ...whereOptions, creatorId },
		}

		return await User.findAll(findOptions)
	}

	static async getById(creatorId: UUID, id: string): Promise<User | null> {
		return await User.findOne({
			where: {
				id,
			},
		})
	}

	static async create(userAttributes: CreationAttributes<User>) {
		return await User.create(userAttributes)
	}

	static async updateById(
		creatorId: UUID,
		id: string,
		updatedUserAttributes: UpdatedUserAttributes,
	): Promise<number> {
		const [affectedRows] = await User.update(updatedUserAttributes, {
			where: { id, creatorId },
		})

		return affectedRows
	}

	static async deleteById(creatorId: UUID, id: string): Promise<number> {
		return await User.destroy({
			where: {
				id,
				creatorId,
			},
		})
	}
}

export default UserService
