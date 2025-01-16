import dotenv from 'dotenv'
import parsePort from '../utils/parsePort.ts'

dotenv.config()

const GLOBAL_OPTIONS = {
	PORT: parsePort(process.env.PORT, 5500),
	JWT_SECRET: process.env.JWT_SECRET ?? 'secret',
	DB_HOST: process.env.DB_HOST ?? 'localhost',
	DB_PORT: parsePort(process.env.DB_PORT, 3306),
	DB_DATABASE: process.env.DB_DATABASE ?? 'user_management_system',
	DB_USER: process.env.DB_USER ?? 'root',
	DB_PASSWORD: process.env.DB_PASSWORD ?? 'secret',
	DEV_MODE: process.env.NODE_ENV === 'development',
}

export default GLOBAL_OPTIONS
