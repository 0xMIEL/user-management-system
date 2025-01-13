import type { UUID } from 'crypto'
import {
	DataTypes,
	Model,
	type InferAttributes,
	type InferCreationAttributes,
} from 'sequelize'
import sequelize from '../configs/db-config.ts'

class Account extends Model<
	InferAttributes<Account>,
	InferCreationAttributes<Account>
> {
	declare id: UUID
	declare login: string
	declare hash: string
	declare createdAt: Date
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
			unique: true,
			validate: {
				len: [4, 15],
			},
		},
		hash: {
			type: DataTypes.STRING(60),
			allowNull: false,
		},
		createdAt: DataTypes.DATE,
	},
	{
		sequelize,
		modelName: 'Account',
		tableName: 'Users',
		updatedAt: false,
	},
)

export default Account
