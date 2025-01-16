import express from 'express'
import authenticateAccount from './middlewares/authenticate-account.ts'
import errorHandler from './middlewares/error-handler.ts'
import notFoundHandler from './middlewares/not-found-handler.ts'
import accountRouter from './router/account-router.ts'
import userRouter from './router/user-router.ts'

const app = express()

app.use(express.json({ limit: '10kb' }))

app.use('/api/auth', accountRouter)

app.use(authenticateAccount)

app.use('/api', userRouter)

app.use('*', notFoundHandler)

app.use(errorHandler)

export default app
