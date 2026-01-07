import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/database'

export class SavingRecord extends Model {
  declare id: string
  declare goalId: string
  declare amount: number
  declare recordDate: Date
  declare source: string
  declare createdAt: Date
}

SavingRecord.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    goalId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'goal_id'
    },
    amount: DataTypes.DECIMAL(10, 2),
    recordDate: {
      type: DataTypes.DATEONLY,
      field: 'record_date'
    },
    source: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    }
  },
  {
    sequelize,
    tableName: 'saving_records',
    timestamps: true,
    updatedAt: false
  }
)
