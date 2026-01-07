import { goalStatus, planType, typeOfResponse } from './enums'

export interface userDTO {
  id: number
  name: string
  email: string
  passwordHash?: string
  isPremium: boolean
  role: string
  createdAt: Date
  updatedAt: Date | null
}
export interface userCreateDTO {
  id: number
  name: string
  email: string
  password: string
  isPremium: boolean
  createdAt: Date
}
export interface userLoginDTO extends userDTO {
  password: string
}
export interface authDTO {
  email: string
  password: string
}

export interface savingGoalDTO {
  id: string
  userId: number
  title: string
  targetAmount: number
  startDate: Date
  endDate: Date
  createdAt: Date
  updatedAt: Date | null
  status: goalStatus
}

export interface savingPlansDTO {
  id: string
  goalId: string
  planType: planType
  amountPerPeriod: number
  totalPeriods: number
  createdAt: Date
}

export interface savingRecordsDTO {
  id: string
  goalId: string
  amount: number
  recordDate: Date
  source: string
  createdAt: Date
}

export interface Response {
  typeOfResponse: typeOfResponse
  message?: string
  data?: any
};
