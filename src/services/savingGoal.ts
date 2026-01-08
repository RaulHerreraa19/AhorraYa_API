import { SavingGoal } from '../models/savingGoal'
import { savingGoalDTO, Response as ServiceResponse } from '../common/types'
import { typeOfResponse, goalStatus } from '../common/enums'
import { parseGoalStatus } from '../common/utils'

export const CreateSavingGoal = async (goalData: savingGoalDTO): Promise<ServiceResponse> => {
  try {
    const newGoal = await SavingGoal.create({
      userId: goalData.userId,
      title: goalData.title,
      targetAmount: goalData.targetAmount,
      startDate: goalData.startDate,
      endDate: goalData.endDate,
      status: goalStatus.ACTIVE
    })
    const goalDTO: savingGoalDTO = {
      id: newGoal.id,
      userId: newGoal.userId,
      title: newGoal.title,
      targetAmount: newGoal.targetAmount,
      startDate: newGoal.startDate,
      endDate: newGoal.endDate,
      createdAt: newGoal.createdAt,
      updatedAt: newGoal.updatedAt,
      status: newGoal.status
    }
    return {
      typeOfResponse: typeOfResponse.SUCCESS,
      data: goalDTO,
      message: 'Meta de ahorro creada exitosamente'
    }
  } catch (error) {
    return {
      typeOfResponse: typeOfResponse.ERROR,
      message: 'Error creando la meta de ahorro'
    }
  }
}

export const GetSavingGoalsByUserId = async (savingGoalDTO: savingGoalDTO): Promise<ServiceResponse> => {
  try {
    const goals = await SavingGoal.findAll({ where: { userId: savingGoalDTO.userId } })
    const goalsDTO: savingGoalDTO[] = goals.map((goal) => ({
      id: goal.id,
      userId: goal.userId,
      title: goal.title,
      targetAmount: goal.targetAmount,
      startDate: goal.startDate,
      endDate: goal.endDate,
      createdAt: goal.createdAt,
      updatedAt: goal.updatedAt,
      status: goal.status
    }))
    return {
      typeOfResponse: typeOfResponse.SUCCESS,
      data: goalsDTO,
      message: 'Metas de ahorro recuperadas exitosamente'
    }
  } catch (error) {
    return {
      typeOfResponse: typeOfResponse.ERROR,
      message: 'Error recuperando las metas de ahorro'
    }
  }
}

export const UpdateSavingGoalStatus = async (goalId: string, status: goalStatus): Promise<ServiceResponse> => {
  try {
    if (parseGoalStatus(status) == null) {
      return {
        typeOfResponse: typeOfResponse.ERROR,
        message: 'Estatus invalido'
      }
    }
    const goal = await SavingGoal.findByPk(goalId)
    if (goal == null) {
      return {
        typeOfResponse: typeOfResponse.ERROR,
        message: 'Meta no encontrada'
      }
    }
    goal.status = status
    await goal.save()
    return {
      typeOfResponse: typeOfResponse.SUCCESS,
      message: 'Estado de la meta actualizado exitosamente'
    }
  } catch (error) {
    return {
      typeOfResponse: typeOfResponse.ERROR,
      message: 'Error actualizando el estado de la meta'
    }
  }
}

export const DeleteSavingGoal = async (goalId: string): Promise<ServiceResponse> => {
  try {
    const goal = await SavingGoal.findByPk(goalId)
    if (goal == null) {
      return {
        typeOfResponse: typeOfResponse.ERROR,
        message: 'Meta no encontrada'
      }
    }
    await goal.destroy()
    return {
      typeOfResponse: typeOfResponse.SUCCESS,
      message: 'Meta eliminada exitosamente'
    }
  } catch (error) {
    return {
      typeOfResponse: typeOfResponse.ERROR,
      message: 'Error eliminando la meta'
    }
  }
}
