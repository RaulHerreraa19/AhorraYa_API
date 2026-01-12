import { SavingRecord } from '../models/savingRecord'
import { savingRecordsDTO, Response as ServiceResponse } from '../common/types'
import { typeOfResponse } from '../common/enums'

export const GetAllRecordsByUser = async (goalId: number): Promise<ServiceResponse> => {
  try {
    const records = await SavingRecord.findAll({ where: { goalId } })
    if (records == null) {
      return {
        typeOfResponse: typeOfResponse.ERROR,
        message: 'No records found for the user'
      }
    }
    const recordsDTO: savingRecordsDTO[] = records.map((record) => ({
      id: record.id,
      userId: record.goalId,
      amount: record.amount,
      goalId: record.goalId,
      recordDate: record.recordDate,
      source: record.source,
      createdAt: record.createdAt
    }))

    return {
      typeOfResponse: typeOfResponse.SUCCESS,
      data: recordsDTO,
      message: 'Records retrieved successfully'
    }
  } catch (error) {
    return {
      typeOfResponse: typeOfResponse.ERROR,
      message: 'Error retrieving records'
    }
  }
}

export const CreateSavingRecord = async (recordData: savingRecordsDTO): Promise<ServiceResponse> => {
  try {
    const newRecord = await SavingRecord.create({
      goalId: recordData.goalId,
      amount: recordData.amount,
      recordDate: recordData.recordDate,
      source: recordData.source
    })
    const recordDTO: savingRecordsDTO = {
      id: newRecord.id,
      goalId: newRecord.goalId,
      amount: newRecord.amount,
      recordDate: newRecord.recordDate,
      source: newRecord.source,
      createdAt: newRecord.createdAt
    }
    return {
      typeOfResponse: typeOfResponse.SUCCESS,
      data: recordDTO,
      message: 'Saving record created successfully'
    }
  } catch (error) {
    return {
      typeOfResponse: typeOfResponse.ERROR,
      message: 'Error creating saving record'
    }
  }
}

export const deleteSavingRecord = async (recordId: number): Promise<ServiceResponse> => {
  try {
    const deletedCount = await SavingRecord.destroy({ where: { id: recordId } })
    if (deletedCount === 0) {
      return {
        typeOfResponse: typeOfResponse.ERROR,
        message: 'Saving record not found'
      }
    }
    return {
      typeOfResponse: typeOfResponse.SUCCESS,
      message: 'Saving record deleted successfully'
    }
  } catch (error) {
    return {
      typeOfResponse: typeOfResponse.ERROR,
      message: 'Error deleting saving record'
    }
  }
}
