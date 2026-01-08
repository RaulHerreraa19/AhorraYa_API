import { Request, Response } from 'express'
import * as SavingService from '../services/savingGoal'
import { typeOfResponse } from '../common/enums'
import { Response as CustomResponse, savingGoalDTO } from '../common/types'

export const getSavings = async (req: Request, res: Response): Promise<void> => {
  const savingGoalDTO: savingGoalDTO = req.body
  const savingsResponse: CustomResponse = await SavingService.GetSavingGoalsByUserId(savingGoalDTO)
  if (savingsResponse.typeOfResponse === typeOfResponse.SUCCESS) {
    res.status(200).json(savingsResponse)
  } else {
    res.status(500).json(savingsResponse)
  }
}

export const getSavingById = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id, 10)
  const savingResponse: CustomResponse = await SavingService.GetSavingById(id)
  if (savingResponse.typeOfResponse === typeOfResponse.SUCCESS) {
    res.status(200).json(savingResponse)
  } else {
    res.status(404).json(savingResponse)
  }
}

export const createSaving = async (req: Request, res: Response): Promise<void> => {
  const savingData = req.body
  const newSaving: CustomResponse = await SavingService.CreateSaving(savingData)
  if (newSaving.typeOfResponse === typeOfResponse.SUCCESS) {
    res.status(200).json(newSaving)
  }
    else {
    res.status(500).json(newSaving)
    }
}

export const deleteSaving = async (req: Request, res: Response): Promise<void> => {
  const savingId = parseInt(req.params.id, 10)
  const savingResponse: CustomResponse = await SavingService.DeleteSaving(savingId)
    if (savingResponse.typeOfResponse === typeOfResponse.SUCCESS) {
        res.status(200).json(savingResponse)
    } else {
        res.status(500).json(savingResponse)
    }
}
    