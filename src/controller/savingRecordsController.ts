import { savingRecordsDTO, Response as CustomResponse } from '../common/types'
import * as SavingRecordService from '../services/savingRecordService'
import { Request, Response } from 'express'
import { typeOfResponse } from '../common/enums'

export const GetAllRecordsByUser = async (req: Request, res: Response): Promise<void> => {
  const goalId = req.query.goalId as string
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
  const recordId = req.params.id as string
  const deleteResponse: CustomResponse = await SavingRecordService.deleteSavingRecord(recordId)
  if (deleteResponse.typeOfResponse === typeOfResponse.SUCCESS) {
    res.status(200).json(deleteResponse)
  } else {
    res.status(500).json(deleteResponse)
  }
}

export const UpdateSavingRecord = async (req: Request, res: Response): Promise<void> => {
  const { id, amount, recordDate } = req.body
  const updateResponse: CustomResponse = await SavingRecordService.UpdateSavingRecord(id, amount, recordDate)
  if (updateResponse.typeOfResponse === typeOfResponse.SUCCESS) {
    res.status(200).json(updateResponse)
  } else {
    res.status(500).json(updateResponse)
  }
}
