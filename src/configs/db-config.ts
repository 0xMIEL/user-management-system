import dotenv from 'dotenv'
import mysql2 from 'mysql2'
import { Sequelize, type Options } from 'sequelize'
import GLOBAL_OPTIONS from './global-options.ts'

dotenv.config()

const dbOptions: Options = {
	host: GLOBAL_OPTIONS.DB_HOST,
	port: GLOBAL_OPTIONS.DB_PORT,
	database: GLOBAL_OPTIONS.DB_DATABASE,
	username: GLOBAL_OPTIONS.DB_USER,
	password: GLOBAL_OPTIONS.DB_PASSWORD,
	dialect: 'mysql',
	dialectModule: mysql2,
	pool: {
		max: 10,
	},
}

const sequelize = new Sequelize(dbOptions)

export default sequelize
