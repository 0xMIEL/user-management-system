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

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
	declare id: CreationOptional<UUID>
	declare firstName: string | null
	declare lastName: string | null
	declare email: string
	declare role: CreationOptional<string>
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
		},
		lastName: {
			type: DataTypes.STRING(50),
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: {
				name: 'unique_user_email',
				msg: 'This email is taken',
			},
		},
		role: {
			type: DataTypes.ENUM('user', 'admin'),
			defaultValue: 'user',
			allowNull: false,
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
