import * as UserService from '../services/userService'
import { Request, Response } from 'express'
import { Response as CustomResponse } from '../common/types'
import { typeOfResponse } from '../common/enums'

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  const usersResponse: CustomResponse = await UserService.GetAllUsers()
  if (usersResponse.typeOfResponse === typeOfResponse.SUCCESS) {
    res.status(200).json(usersResponse)
  } else {
    res.status(500).json(usersResponse)
  }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.params.id, 10)
  const user = await UserService.GetUserById(userId)
  if (user != null) {
    res.status(200).json(user)
  } else {
    res.status(404).json({ message: 'User not found' })
  }
}
