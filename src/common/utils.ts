import { goalStatus } from './enums'

export const generateUID = (): string => {
  return Math.random().toString(36).substr(2, 9)
}

export const isString = (value: any): value is string => {
  return typeof value === 'string' || value instanceof String
}
export const isNumber = (value: any): value is number => {
  return typeof value === 'number' && isFinite(value)
}
export const isDate = (value: any): value is Date => {
  return value instanceof Date && !isNaN(value.getTime())
}

export const parseString = (value: any): string => {
  if (!isString(value)) {
    throw new Error('Invalid string value')
  }
  return value
}

export const parseNumber = (value: any): number => {
  if (!isNumber(value)) {
    throw new Error('Invalid number value')
  }
  return value
}

export const parseDate = (value: any): Date => {
  if (!isDate(value)) {
    throw new Error('Invalid date value')
  }
  return value
}

export const isGoalStatus = (value: any): boolean => {
  return Object.values(goalStatus).includes(value)
}

export const parseGoalStatus = (value: any): goalStatus => {
  if (!isGoalStatus(value)) {
    throw new Error('Invalid goal status value')
  }
  return value as goalStatus
}
