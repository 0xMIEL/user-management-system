import bcrypt from 'bcrypt'
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
	declare password: string
	declare hash: CreationOptional<string>
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
				msg: 'This login is taken.',
			},
		},
		password: {
			type: DataTypes.VIRTUAL,
			allowNull: false,
		},
		hash: {
			type: DataTypes.STRING(60),
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

Account.beforeCreate(async (account: Account) => {
	if (account.password) {
		account.hash = await bcrypt.hash(account.password, 10)
	}
})

export default Account
