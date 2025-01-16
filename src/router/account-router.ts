import { Router } from 'express'
import AccountController from '../controllers/account-controller.ts'
import authenticateAccount from '../middlewares/authenticate-account.ts'
import detectError from '../middlewares/detect-error.ts'
import { validateBody } from '../middlewares/validate-data.ts'
import AccountValidator from '../validators/account-validator.ts'

const accountRouter = Router()

accountRouter.post(
	'/register',
	validateBody(AccountValidator.registerBodySchema),
	detectError(AccountController.register),
)

accountRouter.get(
	'/login',
	validateBody(AccountValidator.loginBodySchema),
	detectError(AccountController.login),
)

accountRouter.delete(
	'/deregister',
	authenticateAccount,
	validateBody(AccountValidator.deregisterBodySchema),
	detectError(AccountController.deregister),
)

export default accountRouter
