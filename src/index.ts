import express from 'express'
import userRouter from './routes/user'
import savingRouter from './routes/saving'
import authRouter from './routes/auth'
import recordsRouter from './routes/records'
import dns from 'dns'
//import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

dns.setDefaultResultOrder('ipv4first')
<<<<<<< HEAD
//const PORT = 3000
=======
const PORT = 8080
>>>>>>> 8299a6fd9663d860747bc11eb10e35a1acbac33d
const app = express()
//app.use(cors({ origin: '*' }))
app.use(express.json())

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/savings', savingRouter)
app.use('/records', recordsRouter)

<<<<<<< HEAD
=======
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})
>>>>>>> 8299a6fd9663d860747bc11eb10e35a1acbac33d
