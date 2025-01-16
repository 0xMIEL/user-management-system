import bcrypt from 'bcrypt'
import type { UUID } from 'crypto'
import JWT from 'jsonwebtoken'
import GLOBAL_OPTIONS from '../configs/global-options.ts'
import ClientError from '../errors/serverError.ts'
import Account from '../models/account-model.ts'

class AccountService {
	static async register(login: string, password: string): Promise<Account> {
		return await Account.create({ login, password })
	}

	static async login(login: string, password: string): Promise<string> {
		const account = await Account.findOne({
			where: {
				login,
			},
		})

		if (!account)
			throw new ClientError('No account found with the provided login.')

		const isPasswordCorrect = await bcrypt.compare(password, account.hash)

		if (!isPasswordCorrect)
			throw new ClientError('The password you entered is incorrect.')

		const token = JWT.sign(
			{
				accountId: account.id,
			},
			GLOBAL_OPTIONS.JWT_SECRET,
			{
				expiresIn: '7 days',
				issuer: 'user-management-app',
			},
		)

		return token
	}

	static async deregister(accountId: UUID, password: string): Promise<void> {
		const account = await Account.findOne({
			where: {
				id: accountId,
			},
		})

		if (!account) throw new ClientError('Account does not exist.')

		const isPasswordCorrect = await bcrypt.compare(password, account.hash)

		if (!isPasswordCorrect)
			throw new ClientError('Incorrect password provided.')

		await Account.destroy({
			where: {
				id: accountId,
			},
		})
	}
}

export default AccountService
