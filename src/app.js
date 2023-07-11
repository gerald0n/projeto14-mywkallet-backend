import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.mjs'
import transactionRouter from './routes/transactionRoutes.mjs'
import authRouter from './routes/authRoutes.mjs'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use(userRouter);
app.use(transactionRouter);
app.use(authRouter);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
