import app from './app.ts'
import sequelize from './configs/db-config.ts'
import GLOBAL_OPTIONS from './configs/global-options.ts'

try {
	await sequelize.authenticate()
	console.info('1. properly connected to the database...')

	await sequelize.sync({ force: false })
	console.info('2. properly synchronized the database...')

	app.listen(GLOBAL_OPTIONS.PORT, () =>
		console.info(
			`3. server is running on http://localhost:${GLOBAL_OPTIONS.PORT}...`,
		),
	)
} catch (error) {
	console.log('Error: ', error)
	process.exit(1)
}
