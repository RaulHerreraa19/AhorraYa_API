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
