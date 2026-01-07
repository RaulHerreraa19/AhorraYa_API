import express from 'express'
import * as UserController from '../controller/userController'
const userRouter = express.Router()

userRouter.get('/', UserController.getUsers)

export default userRouter
