import { Request, Response } from 'express'
import { savingGoalDTO } from '../common/types'
import * as savingGoalService from '../services/savingGoal'
import { typeOfResponse } from '../common/enums'

export const createSavingGoal = async (req: Request, res: Response): Promise<Response> => {
  const goalData: savingGoalDTO = req.body
  const serviceResponse = await savingGoalService.CreateSavingGoal(goalData)
  if (serviceResponse.typeOfResponse === typeOfResponse.SUCCESS) {
    return res.status(201).json(serviceResponse)
  } else {
    return res.status(500).json(serviceResponse)
  }
}

export const getSavingGoalsByUserId = async (req: Request, res: Response): Promise<Response> => {
  const userId = parseInt(req.params.userId as string, 10)
  const serviceResponse = await savingGoalService.GetSavingGoalsByUserId(userId)
  if (serviceResponse.typeOfResponse === typeOfResponse.SUCCESS) {
    return res.status(200).json(serviceResponse)
  } else {
    return res.status(500).json(serviceResponse)
  }
}
