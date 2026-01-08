import * as UserService from '../services/userService'
import { Request, Response } from 'express'
import { Response as CustomResponse, userCreateDTO } from '../common/types'
import { typeOfResponse } from '../common/enums'

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body
  console.log('controller email:', email, 'password:', password)
  const authResponse: CustomResponse = await UserService.AuthenticateUser(email, password)
  if (authResponse.typeOfResponse === typeOfResponse.SUCCESS) {
    res.status(200).json(authResponse)
  } else {
    res.status(401).json(authResponse)
  }
}

export const register = async (req: Request, res: Response): Promise<void> => {
  const userCreate: userCreateDTO = req.body
  let response: CustomResponse = await UserService.GetUserByEmail(userCreate.email)
  if (response.typeOfResponse !== typeOfResponse.SUCCESS) {
    response = await UserService.CreateUser(userCreate)
    if (response == null) {
      res.status(400).json(response)
      return
    }
  }
  res.status(200).json(response)
}

export const logout = async (req: Request, res: Response): Promise<void> => {
  const refreshToken = req.body.refreshToken
  const response: CustomResponse = await UserService.LogoutUser(refreshToken)
  if (response.typeOfResponse === typeOfResponse.SUCCESS) {
    res.status(200).json(response)
  } else {
    res.status(400).json(response)
  }
}

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  const refreshToken = req.body.refreshToken
  const response: CustomResponse = await UserService.RefreshAuthToken(refreshToken)
  if (response.typeOfResponse === typeOfResponse.SUCCESS) {
    res.status(200).json(response)
  } else {
    res.status(401).json(response)
  }
}

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  const email = req.body.email
  const response: CustomResponse = await UserService.InitiatePasswordReset(email)
  if (response.typeOfResponse === typeOfResponse.SUCCESS) {
    res.status(200).json(response)
  } else {
    res.status(400).json(response)
  }
}

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const { token, newPassword } = req.body
  const response: CustomResponse = await UserService.ResetUserPassword(token, newPassword)  
  if (response.typeOfResponse === typeOfResponse.SUCCESS) {
    res.status(200).json(response)
  } else {
    res.status(400).json(response)
  }
}
