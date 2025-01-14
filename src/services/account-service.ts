import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import NotFoundError from '../errors/not-found-error.ts'
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

		if (!account) {
			throw new NotFoundError('Wrong password or login.')
		}

		const isPasswordCorrect = await bcrypt.compare(password, account.hash)

		if (!isPasswordCorrect) {
			throw new NotFoundError('Wrong password or login.')
		}

		const token = JWT.sign(
			{
				id: account.id,
				login: account.login,
			},
			'secret',
		)

		return token
	}

	static async unregister(id: string, password: string) {
		const account = await Account.findOne({
			where: {
				id,
			},
		})

		if (!account) throw new NotFoundError('This account does not exist.')

		const isPasswordCorrect = await bcrypt.compare(password, account.hash)

		if (!isPasswordCorrect) {
			throw new NotFoundError('Wrong password.')
		}

		return await Account.destroy({
			where: {
				id,
			},
		})
	}
}

export default AccountService
