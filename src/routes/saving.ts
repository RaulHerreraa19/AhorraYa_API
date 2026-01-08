import express from 'express'
import * as SavingController from '../controller/savingController'

const SavingRouter = express.Router()

SavingRouter.get('/', SavingController.getSavings)
SavingRouter.post('/', SavingController.createSaving)
SavingRouter.put('/:id', SavingController.updateSaving)
SavingRouter.delete('/:id', SavingController.deleteSaving)

export default SavingRouter
