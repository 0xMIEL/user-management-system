import type { UUID } from 'crypto'
import {
	DataTypes,
	Model,
	type CreationOptional,
	type InferAttributes,
	type InferCreationAttributes,
} from 'sequelize'
import sequelize from '../configs/db-config.ts'
import Account from './account-model.ts'

type Role = 'admin' | 'user'

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
	declare id: CreationOptional<UUID>
	declare firstName: string | null
	declare lastName: string | null
	declare email: string
	declare role: CreationOptional<Role>
	declare createdAt: CreationOptional<Date>
	declare updatedAt: CreationOptional<Date>
	declare creatorId: UUID
}

export type UpdatedUserAttributes = Partial<
	Pick<User, 'firstName' | 'lastName' | 'email' | 'role'>
>

User.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		firstName: {
			type: DataTypes.STRING(50),
			validate: {
				is: {
					args: /^[A-Za-z\s]+$/,
					msg: 'First name can only contain letters and spaces.',
				},
				notEmpty: {
					msg: 'First name cannot be empty.',
				},
			},
		},
		lastName: {
			type: DataTypes.STRING(50),
			validate: {
				is: {
					args: /^[A-Za-z\s]+$/,
					msg: 'Last name can only contain letters and spaces.',
				},
				notEmpty: {
					msg: 'Last name cannot be empty.',
				},
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: {
				name: 'unique_user_email',
				msg: 'Email must be unique.',
			},
			validate: {
				notNull: {
					msg: 'Email cannot be null.',
				},
				notEmpty: {
					msg: 'Email cannot be empty.',
				},
				isEmail: {
					msg: 'Invalid email format.',
				},
			},
		},
		role: {
			type: DataTypes.ENUM('user', 'admin'),
			defaultValue: 'user',
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Role cannot be null.',
				},
				isIn: {
					args: [['user', 'admin']],
					msg: 'Role must be either "user" or "admin".',
				},
			},
		},
		updatedAt: DataTypes.DATE,
		createdAt: DataTypes.DATE,
		creatorId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: Account,
				key: 'id',
			},
			onDelete: 'CASCADE',
			validate: {
				notNull: {
					msg: 'CreatorId cannot be null.',
				},
			},
		},
	},
	{
		sequelize,
		modelName: 'User',
		tableName: 'users',
		timestamps: true,
	},
)

User.belongsTo(Account, {
	foreignKey: 'creatorId',
	as: 'creator',
})

Account.hasMany(User, {
	foreignKey: 'creatorId',
	as: 'users',
})

export default User
