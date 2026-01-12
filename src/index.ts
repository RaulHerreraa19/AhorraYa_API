import express from 'express'
import userRouter from './routes/user'
import savingRouter from './routes/saving'
import authRouter from './routes/auth'
import dns from 'dns'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

dns.setDefaultResultOrder('ipv4first')
const PORT = 3000
const app = express()
app.use(cors())
app.use(express.json())

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/savings', savingRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
