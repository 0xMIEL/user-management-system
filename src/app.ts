import express from 'express'
import authenticateAccount from './middlewares/authenticate-account.ts'
import errorHandler from './middlewares/error-handler.ts'
import accountRouter from './router/account-router.ts'
import userRouter from './router/user-router.ts'

const app = express()

app.use(express.json())

app.use('/api/auth', accountRouter)

app.use(authenticateAccount)

app.use('/api', userRouter)

app.use(errorHandler)

export default app
