import express from 'express'
import * as AuthController from '../controller/authController'
const AuthRouter = express.Router()

AuthRouter.post('/register', AuthController.register)
AuthRouter.post('/login', AuthController.login)
AuthRouter.post('/logout', AuthController.logout)
AuthRouter.post('/refresh-token', AuthController.refreshToken)
AuthRouter.post('/forgot-password', AuthController.forgotPassword)
AuthRouter.post('/reset-password', AuthController.resetPassword)

export default AuthRouter
