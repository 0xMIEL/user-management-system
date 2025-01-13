import mysql2 from 'mysql2'
import { Sequelize, type Options } from 'sequelize'
import parsePort from '../utils/parsePort.ts'

const dbOptions: Options = {
	host: process.env.DB_HOST ?? 'localhost',
	port: parsePort(process.env.PORT, 3306),
	database: process.env.DATABASE ?? 'user_management_system',
	username: process.env.DB_USER ?? 'root',
	password: process.env.DB_PASSWORD ?? 'secret',
	dialect: 'mysql',
	dialectModule: mysql2,
	pool: {
		max: 10,
	},
}

const sequelize = new Sequelize(dbOptions)

export default sequelize