import express from 'express'
import { validateToken } from '../middlewares/Token'
import * as SavingRecordController from '../controller/savingRecordsController'
const Records = express.Router()

Records.get('/', validateToken, SavingRecordController.GetAllRecordsByUser)
Records.post('/', validateToken, SavingRecordController.CreateSavingRecord)
Records.delete('/:id', validateToken, SavingRecordController.DeleteSavingRecord)
