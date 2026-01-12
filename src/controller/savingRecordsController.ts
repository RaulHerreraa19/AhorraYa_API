import { savingRecordsDTO, Response as CustomResponse } from '../common/types'
import * as SavingRecordService from '../services/savingRecordService'
import { Request, Response } from 'express'
import { typeOfResponse } from '../common/enums'

export const GetAllRecordsByUser = async (req: Request, res: Response): Promise<void> => {
  const goalId = parseInt(req.query.goalId as string, 10)
  const recordsResponse: CustomResponse = await SavingRecordService.GetAllRecordsByUser(goalId)
  if (recordsResponse.typeOfResponse === typeOfResponse.SUCCESS) {
    res.status(200).json(recordsResponse)
  } else {
    res.status(500).json(recordsResponse)
  }
}

export const CreateSavingRecord = async (req: Request, res: Response): Promise<void> => {
  const recordData: savingRecordsDTO = req.body
  const createResponse: CustomResponse = await SavingRecordService.CreateSavingRecord(recordData)
  if (createResponse.typeOfResponse === typeOfResponse.SUCCESS) {
    res.status(200).json(createResponse)
  } else {
    res.status(500).json(createResponse)
  }
}

export const DeleteSavingRecord = async (req: Request, res: Response): Promise<void> => {
  const recordId = parseInt(req.params.id, 10)
  const deleteResponse: CustomResponse = await SavingRecordService.deleteSavingRecord(recordId)
  if (deleteResponse.typeOfResponse === typeOfResponse.SUCCESS) {
    res.status(200).json(deleteResponse)
  } else {
    res.status(500).json(deleteResponse)
  }
}
