import express from 'express'
import * as UserController from '../controller/userController'
import { validateAdminToken } from '../middlewares/validateToken'
const userRouter = express.Router()

userRouter.get('/', validateAdminToken, UserController.getUsers)
userRouter.get('/:id', validateAdminToken, UserController.getUserById)
userRouter.post('/', validateAdminToken, UserController.createUser)
userRouter.post('/update', validateAdminToken, UserController.UpdateUser)
userRouter.delete('/:id', validateAdminToken, UserController.deleteUser)

export default userRouter
