import type { Request, Response } from 'express'
import STATUS_CODES from '../configs/status-codes.ts'

const notFoundHandler = (req: Request, res: Response) => {
	res.status(STATUS_CODES.NOT_FOUND).json({
		status: 'error',
		message: `Route ${req.url} does not exist.`,
	})
}

export default notFoundHandler