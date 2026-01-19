import express from 'express'
import * as SavingController from '../controller/savingController'
import { validateToken } from '../middlewares/Token'

const SavingRouter = express.Router()

SavingRouter.get('/:id', validateToken, SavingController.getSavings)
SavingRouter.post('/create', validateToken, SavingController.createSaving)
SavingRouter.post('/update', validateToken, SavingController.updateSaving)
SavingRouter.post('/update-details', validateToken, SavingController.updateSavingDetails)
SavingRouter.delete('/:id', validateToken, SavingController.deleteSaving)

export default SavingRouter
