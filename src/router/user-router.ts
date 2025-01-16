import { Router } from 'express'
import UserController from '../controllers/user-controller.ts'
import detectError from '../middlewares/detect-error.ts'
import Validator from '../middlewares/validate-data.ts'
import UserValidator from '../validators/user-validator.ts'

const userRouter = Router()

userRouter.get(
	'/users',
	Validator.validateQuery(UserValidator.getAllQuerySchema),
	detectError(UserController.getAll),
)

userRouter.get(
	'/user/:id',
	Validator.validateParams(UserValidator.basicParamsSchema),
	detectError(UserController.getOne),
)

userRouter.post(
	'/user',
	Validator.validateBody(UserValidator.createOneBodySchema),
	detectError(UserController.createOne),
)

userRouter.patch(
	'/user/:id',
	Validator.validateParams(UserValidator.basicParamsSchema),
	Validator.validateBody(UserValidator.updateOneBodySchema),
	detectError(UserController.updateOne),
)

userRouter.delete(
	'/user/:id',
	Validator.validateParams(UserValidator.basicParamsSchema),
	detectError(UserController.deleteOne),
)

export default userRouter
