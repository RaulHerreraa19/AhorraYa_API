import express from 'express'
import userRouter from './routes/user'
import savingRouter from './routes/saving'
import authRouter from './routes/auth'
import dns from 'dns'
import dotenv from 'dotenv'
dotenv.config()

dns.setDefaultResultOrder('ipv4first')
const PORT = 3000
const app = express()
app.use(express.json())

app.get('/ping', (_req, res) => {
  console.log('Received ping request')
  res.send('pong')
})

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/goals', savingRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
