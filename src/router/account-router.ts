import { Router } from 'express'
import AccountController from '../controllers/account-controller.ts'
import authenticateAccount from '../middlewares/authenticate-account.ts'
import detectError from '../middlewares/detect-error.ts'
import Validator from '../middlewares/validate-data.ts'
import AccountValidator from '../validators/account-validator.ts'

const accountRouter = Router()

accountRouter.post(
	'/register',
	Validator.validateBody(AccountValidator.registerBodySchema),
	detectError(AccountController.register),
)

accountRouter.get(
	'/login',
	Validator.validateBody(AccountValidator.loginBodySchema),
	detectError(AccountController.login),
)

accountRouter.delete(
	'/deregister',
	authenticateAccount,
	Validator.validateBody(AccountValidator.deregisterBodySchema),
	detectError(AccountController.deregister),
)

export default accountRouter
