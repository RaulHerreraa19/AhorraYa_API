import express from 'express'
import * as AuthController from '../controller/authController'
const AuthRouter = express.Router()

AuthRouter.post('/register', AuthController.register)
AuthRouter.post('/login', AuthController.login)

export default AuthRouter
