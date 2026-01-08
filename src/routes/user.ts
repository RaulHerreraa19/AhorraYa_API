import express from 'express'
import * as UserController from '../controller/userController'
const userRouter = express.Router()

userRouter.get('/', UserController.getUsers)
userRouter.get('/:id', UserController.getUserById)
userRouter.post('/', UserController.)

export default userRouter
