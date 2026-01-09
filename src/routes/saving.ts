import express from 'express'
import * as SavingController from '../controller/savingController'
import { validateToken } from '../middlewares/validateToken'

const SavingRouter = express.Router()

SavingRouter.get('/', validateToken, SavingController.getSavings)
SavingRouter.post('/', validateToken, SavingController.createSaving)
SavingRouter.post('/update', validateToken, SavingController.updateSaving)
SavingRouter.delete('/:id', validateToken, SavingController.deleteSaving)

export default SavingRouter
