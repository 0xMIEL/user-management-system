import type { UUID } from 'crypto'

declare global {
	namespace Express {
		interface Request {
			accountId?: UUID
			params: {
				id: UUID
			}
		}
	}
}
