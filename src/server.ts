import app from './app.ts'
import sequelize from './configs/db-config.ts'
import GLOBAL_OPTIONS from './configs/global-options.ts'

try {
	await sequelize.authenticate()
	console.info('\x1b[32m%s\x1b[0m', 'properly connected to the database...')

	await sequelize.sync({ force: false })
	console.info('\x1b[32m%s\x1b[0m', 'properly synchronized the database...')

	app.listen(GLOBAL_OPTIONS.PORT, () =>
		console.info(
			'\x1b[34m%s\x1b[0m',
			`server is running on http://localhost:${GLOBAL_OPTIONS.PORT}...`,
		),
	)
} catch (error) {
	console.log(error)
}
