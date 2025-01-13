import type { UUID } from 'crypto'
import {
	DataTypes,
	Model,
	type CreationOptional,
	type InferAttributes,
	type InferCreationAttributes,
} from 'sequelize'
import sequelize from '../configs/db-config.ts'

class Account extends Model<
	InferAttributes<Account>,
	InferCreationAttributes<Account>
> {
	declare id: CreationOptional<UUID>
	declare login: string
	declare hash: string
	declare createdAt: CreationOptional<Date>
}

Account.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		login: {
			type: DataTypes.STRING(15),
			allowNull: false,
			unique: {
				name: 'unique_account_login',
				msg: 'Login must be unique.',
			},
			validate: {
				notNull: {
					msg: 'Login cannot be null.',
				},
				notEmpty: {
					msg: 'Login cannot be empty.',
				},
				is: {
					args: /^[A-Za-z0-9_-]+$/,
					msg: 'Login can only contain letters, numbers, underscores (_), and hyphens (-).',
				},
				len: {
					args: [4, 15],
					msg: 'Login must be between 4 and 15 characters long.',
				},
			},
		},
		hash: {
			type: DataTypes.STRING(60),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Hash cannot be null.',
				},
				notEmpty: {
					msg: 'Hash cannot be empty.',
				},
			},
		},
		createdAt: DataTypes.DATE,
	},
	{
		sequelize,
		modelName: 'Account',
		tableName: 'accounts',
		updatedAt: false,
	},
)

export default Account
