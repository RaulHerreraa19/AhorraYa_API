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
  const id = parseInt(req.params.id, 10)
  const userResponse: CustomResponse = await UserService.GetUserById(id)
  if (userResponse.typeOfResponse === typeOfResponse.SUCCESS) {
    res.status(200).json(userResponse)
  } else {
    res.status(404).json(userResponse)
  }
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const userData = req.body
  const newUser = await UserService.CreateUser(userData)
  if (newUser != null) {
    res.status(200).json(newUser)
  } else {
    res.status(500).json({ message: 'Error creating user' })
  }
}

export const UpdateUser = async (req: Request, res: Response): Promise<void> => {
  const userDTO = req.body
  const userResponse: CustomResponse = await UserService.UpdateUser(userDTO)
  if (userResponse.typeOfResponse === typeOfResponse.SUCCESS) {
    res.status(200).json(userResponse)
  } else {
    res.status(500).json(userResponse)
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.params.id, 10)
  const userResponse: CustomResponse = await UserService.DeleteUser(userId)
  if (userResponse.typeOfResponse === typeOfResponse.SUCCESS) {
    res.status(200).json(userResponse)
  } else {
    res.status(500).json(userResponse)
  }
}
