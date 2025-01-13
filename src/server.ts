import dotenv from 'dotenv'
dotenv.config()

import http from 'node:http'
import sequelize from './configs/db-config.ts'

const PORT = process.env.PORT ?? 3000

const server = http.createServer(app)

try {
	await sequelize.authenticate()
	console.info('\x1b[32m%s\x1b[0m', 'properly connected to the database...')

	await sequelize.sync({ force: true }) // dev mode

	server.listen(PORT, () =>
		console.info(
			'\x1b[34m%s\x1b[0m',
			`server is running on http://localhost:${PORT}...`,
		),
	)
} catch (error) {
	console.log(error)
}
