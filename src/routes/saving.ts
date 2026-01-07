import express from 'express'

const SavingRouter = express.Router()

SavingRouter.get('/', (_req, res) => {
  res.send('Saving route')
})
export default SavingRouter
