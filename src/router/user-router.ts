import { Router } from 'express'
import UserController from '../controllers/user-controller.ts'
import detectError from '../middlewares/detect-error.ts'
import { validateBody, validateParams } from '../middlewares/validate-data.ts'
import UserValidator from '../validators/user-validator.ts'

const userRouter = Router()

userRouter.get(
	'/users',
	validateBody(UserValidator.getAllQuerySchema),
	detectError(UserController.getAll),
)

userRouter.get(
	'/user/:id',
	validateParams(UserValidator.basicParamsSchema),
	detectError(UserController.getOne),
)

userRouter.post(
	'/user',
	validateBody(UserValidator.createOneBodySchema),
	detectError(UserController.createOne),
)

userRouter.patch(
	'/user/:id',
	validateParams(UserValidator.basicParamsSchema),
	validateBody(UserValidator.updateOneBodySchema),
	detectError(UserController.updateOne),
)

userRouter.delete(
	'/user/:id',
	validateParams(UserValidator.basicParamsSchema),
	detectError(UserController.deleteOne),
)

export default userRouter
