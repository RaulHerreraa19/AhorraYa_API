import { SavingGoal } from '../models/savingGoal'
import { savingGoalDTO, Response as ServiceResponse } from '../common/types'
import { typeOfResponse, goalStatus } from '../common/enums'

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
      message: 'Saving goal created successfully'
    }
  } catch (error) {
    return {
      typeOfResponse: typeOfResponse.ERROR,
      message: 'Error creating saving goal'
    }
  }
}

export const GetSavingGoalsByUserId = async (userId: number): Promise<ServiceResponse> => {
  try {
    const goals = await SavingGoal.findAll({ where: { userId } })
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
      message: 'Saving goals retrieved successfully'
    }
  } catch (error) {
    return {
      typeOfResponse: typeOfResponse.ERROR,
      message: 'Error retrieving saving goals'
    }
  }
}

export const UpdateSavingGoalStatus = async (goalId: string, status: goalStatus): Promise<ServiceResponse> => {
  try {
    const goal = await SavingGoal.findByPk(goalId)
    if (goal == null) {
      return {
        typeOfResponse: typeOfResponse.ERROR,
        message: 'Saving goal not found'
      }
    }
    goal.status = status
    await goal.save()
    return {
      typeOfResponse: typeOfResponse.SUCCESS,
      message: 'Saving goal status updated successfully'
    }
  } catch (error) {
    return {
      typeOfResponse: typeOfResponse.ERROR,
      message: 'Error updating saving goal status'
    }
  }
}

export const DeleteSavingGoal = async (goalId: string): Promise<ServiceResponse> => {
  try {
    const goal = await SavingGoal.findByPk(goalId)
    if (goal == null) {
      return {
        typeOfResponse: typeOfResponse.ERROR,
        message: 'Saving goal not found'
      }
    }
    await goal.destroy()
    return {
      typeOfResponse: typeOfResponse.SUCCESS,
      message: 'Saving goal deleted successfully'
    }
  } catch (error) {
    return {
      typeOfResponse: typeOfResponse.ERROR,
      message: 'Error deleting saving goal'
    }
  }
}
