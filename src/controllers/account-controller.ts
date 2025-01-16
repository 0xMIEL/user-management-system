import type { Request, Response } from 'express'
import ServerError from '../errors/clientError.ts'
import AccountService from '../services/account-service.ts'

class AccountController {
	static async register(req: Request, res: Response) {
		const { login, password } = req.body

		const account = await AccountService.register(login, password)

		if (!account) throw new ServerError('Problem with creating a user.')

		res.status(201).json({
			status: 'success',
			message: `An account named '${login}' has been successfully registered.`,
		})
	}

	static async login(req: Request, res: Response) {
		const { login, password } = req.body

		const token = await AccountService.login(login, password)

		res.status(200).json({
			status: 'success',
			message: `A user named '${login}' was successfully granted an access token.`,
			token,
		})
	}

	static async deregister(req: Request, res: Response) {
		if (!req.accountId) throw new ServerError('Account ID is missing.')

		const { password } = req.body

		await AccountService.deregister(req.accountId, password)

		res.status(200).json({
			status: 'success',
			message: `The account with ID '${req.accountId}' has been successfully deregistered.`,
		})
	}
}

export default AccountController
