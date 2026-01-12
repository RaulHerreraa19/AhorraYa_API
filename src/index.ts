import express from 'express'
import userRouter from './routes/user'
import savingRouter from './routes/saving'
import authRouter from './routes/auth'
import dns from 'dns'
// import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

dns.setDefaultResultOrder('ipv4first')
const PORT = 8080
const app = express()
// app.use(cors())
app.use(express.json())

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/savings', savingRouter)

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})
