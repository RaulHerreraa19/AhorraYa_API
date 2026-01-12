import { User } from '../models/userModel'
import { userDTO, userCreateDTO, Response as ServiceResponse } from '../common/types'
import { typeOfResponse } from '../common/enums'
import { compareSync, hashSync } from 'bcrypt-ts'
import * as jwt from 'jsonwebtoken'
import { senderMail } from './mailSender'

export const GetAllUsers = async (): Promise<ServiceResponse> => {
  const users = await User.findAll()
  if (users == null) {
    return {
      typeOfResponse: typeOfResponse.ERROR,
      message: 'No users found'
    }
  }
  const usersDTO: userDTO[] = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    isPremium: user.isPremium,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }))
  return {
    typeOfResponse: typeOfResponse.SUCCESS,
    data: usersDTO,
    message: 'Users retrieved successfully'
  }
}

export const GetUserById = async (id: number): Promise<ServiceResponse> => {
  const response: ServiceResponse = { typeOfResponse: typeOfResponse.ERROR, message: 'User not found' }
  const user = await User.findByPk(id)
  if (user == null) {
    return response
  }
  const userDTO: userDTO = {
    id: user.id,
    name: user.name,
    email: user.email,
    isPremium: user.isPremium,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }
  response.typeOfResponse = typeOfResponse.SUCCESS
  response.data = userDTO
  response.message = 'User retrieved successfully'
  return response
}

export const GetUserByEmail = async (email: string): Promise<ServiceResponse> => {
  const user = await User.findOne({ where: { email } })
  if (user == null) {
    return {
      typeOfResponse: typeOfResponse.ERROR,
      message: 'Usuario no encontrado'
    }
  }
  const userDTO: userDTO = {
    id: user.id,
    name: user.name,
    email: user.email,
    isPremium: user.isPremium,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }
  return {
    typeOfResponse: typeOfResponse.SUCCESS,
    data: userDTO,
    message: 'Usuario recuperado exitosamente'
  }
}

export const AuthenticateUser = async (email: string, password: string): Promise<ServiceResponse> => {
  const user = await User.findOne({ where: { email } })
  if (user == null) {
    return {
      typeOfResponse: typeOfResponse.ERROR,
      message: 'El correo no está registrado'
    }
  }
  const hashedpasscheck = compareSync(password, user.passwordHash)
  if (!hashedpasscheck) {
    return {
      typeOfResponse: typeOfResponse.ERROR,
      message: 'contraseña incorrecta'
    }
  }
  const userDTO: userDTO = {
    id: user.id,
    name: user.name,
    email: user.email,
    isPremium: user.isPremium,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }
  const expiration = process.env.JWT_EXPIRES_IN != null ? process.env.JWT_EXPIRES_IN : '120'
  const expiresIn = parseInt(expiration, 10) * 60

  const token = jwt.sign(
    { userId: user.id, email: user.email, isPremium: user.isPremium, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn }
  )

  return {
    typeOfResponse: typeOfResponse.SUCCESS,
    message: 'Login exitoso',
    data: {
      user: { ...userDTO },
      token
    }
  }
}

export const CreateUser = async (userCreate: userCreateDTO): Promise<ServiceResponse> => {
  const existingUser = await User.findOne({ where: { email: userCreate.email } })
  if (existingUser != null) {
    return {
      typeOfResponse: typeOfResponse.ERROR,
      message: 'este correo ya está en uso'
    }
  }
  const saltRounds =
  process.env.HASH_SALT_ROUNDS !== undefined
    ? Number.parseInt(process.env.HASH_SALT_ROUNDS, 10)
    : 10
  const hashPassword = hashSync(userCreate.password, saltRounds)
  const newUser = await User.create({
    name: userCreate.name,
    email: userCreate.email,
    passwordHash: hashPassword,
    isPremium: userCreate.isPremium,
    role: 'user'
  })
  return {
    typeOfResponse: typeOfResponse.SUCCESS,
    data: newUser,
    message: 'Registro de usuario exitoso'
  }
}

export const UpdateUser = async (user: userDTO): Promise<ServiceResponse> => {
  const existingUser = await User.findByPk(user.id)
  if (existingUser == null) {
    return {
      typeOfResponse: typeOfResponse.ERROR,
      message: 'Usuario no encontrado'
    }
  }
  existingUser.name = user.name
  existingUser.email = user.email
  existingUser.isPremium = user.isPremium
  existingUser.role = user.role
  existingUser.updatedAt = new Date()
  await existingUser.save()
  return {
    typeOfResponse: typeOfResponse.SUCCESS,
    data: existingUser,
    message: 'Usuario actualizado exitosamente'
  }
}
export const DeleteUser = async (id: number): Promise<ServiceResponse> => {
  const existingUser = await User.findByPk(id)
  if (existingUser == null) {
    return {
      typeOfResponse: typeOfResponse.ERROR,
      message: 'Usuario no encontrado'
    }
  }
  await existingUser.destroy()
  return {
    typeOfResponse: typeOfResponse.SUCCESS,
    message: 'Usuario eliminado exitosamente'
  }
}

export const forgotPassword = async (email: string): Promise<ServiceResponse> => {
  const res: ServiceResponse = { typeOfResponse: typeOfResponse.ERROR, message: 'Function not implemented' }
  const user = await User.findOne({ where: { email } })
  if (user == null) {
    res.message = 'Email not registered'
    res.typeOfResponse = typeOfResponse.ERROR
    return res
  }
  const sendSuccessful = await senderMail(email)
  if (sendSuccessful != null || sendSuccessful !== undefined) {
    res.message = 'Se envió un correo electrónico de restablecimiento de contraseña'
    res.typeOfResponse = typeOfResponse.SUCCESS
  } else {
    res.message = 'Error sending email'
    res.typeOfResponse = typeOfResponse.ERROR
  }
  return res
}

// export const logoutUser = async (refreshToken: string): Promise<ServiceResponse> => {
//   // help me to make the method

//   return {
//     typeOfResponse: typeOfResponse.SUCCESS,
//     message: 'User logged out successfully'
//   }
// }
