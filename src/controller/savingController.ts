import { Request, Response } from 'express'
import * as SavingService from '../services/savingGoal'
import { typeOfResponse } from '../common/enums'
import { Response as CustomResponse, savingGoalDTO } from '../common/types'

export const getSavings = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const idnumber = parseInt(id, 10)
  const savingsResponse: CustomResponse = await SavingService.GetSavingGoalsByUserId(idnumber)
  if (savingsResponse.typeOfResponse === typeOfResponse.SUCCESS) {
    res.status(200).json(savingsResponse)
  } else {
    res.status(500).json(savingsResponse)
  }
}

export const createSaving = async (req: Request, res: Response): Promise<void> => {
  const savingGoalDTO: savingGoalDTO = req.body
  const newSaving: CustomResponse = await SavingService.CreateSavingGoal(savingGoalDTO)
  if (newSaving.typeOfResponse === typeOfResponse.SUCCESS) {
    res.status(200).json(newSaving)
  } else {
    res.status(500).json(newSaving)
  }
}

export const updateSaving = async (req: Request, res: Response): Promise<void> => {
  const savingGoalDTO: savingGoalDTO = req.body
  const savingResponse: CustomResponse = await SavingService.UpdateSavingGoalStatus(savingGoalDTO.id, savingGoalDTO.status)
  if (savingResponse.typeOfResponse === typeOfResponse.SUCCESS) {
    res.status(200).json(savingResponse)
  } else {
    res.status(500).json(savingResponse)
  }
}

export const deleteSaving = async (req: Request, res: Response): Promise<void> => {
  const savingId = req.params.id
  const savingResponse: CustomResponse = await SavingService.DeleteSavingGoal(savingId)
  if (savingResponse.typeOfResponse === typeOfResponse.SUCCESS) {
    res.status(200).json(savingResponse)
  } else {
    res.status(500).json(savingResponse)
  }
}

export const updateSavingDetails = async (req: Request, res: Response): Promise<void> => {
  const savingGoalDTO: savingGoalDTO = req.body
  const savingResponse: CustomResponse = await SavingService.UpdateSavingGoal(savingGoalDTO)
  if (savingResponse.typeOfResponse === typeOfResponse.SUCCESS) {
    res.status(200).json(savingResponse)
  } else {
    res.status(500).json(savingResponse)
  }
}
