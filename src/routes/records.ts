import express from 'express'
import { validateToken } from '../middlewares/Token'
import * as SavingRecordController from '../controller/savingRecordsController'
const Records = express.Router()

Records.get('/', validateToken, SavingRecordController.GetAllRecordsByUser)
Records.post('/', validateToken, SavingRecordController.CreateSavingRecord)
Records.post('/update', validateToken, SavingRecordController.UpdateSavingRecord)
Records.delete('/:id', validateToken, SavingRecordController.DeleteSavingRecord)

export default Records

