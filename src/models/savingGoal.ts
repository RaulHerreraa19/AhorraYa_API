import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/database'
import { goalStatus } from '../common/enums'

export class SavingGoal extends Model {
  declare id: string
  declare userId: number
  declare title: string
  declare targetAmount: number
  declare startDate: Date
  declare endDate: Date
  declare status: goalStatus
  declare createdAt: Date
  declare updatedAt: Date
}

SavingGoal.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: 'user_id'
    },
    title: DataTypes.STRING,
    targetAmount: {
      type: DataTypes.DECIMAL(10, 2),
      field: 'target_amount'
    },
    startDate: {
      type: DataTypes.DATEONLY,
      field: 'start_date'
    },
    endDate: {
      type: DataTypes.DATEONLY,
      field: 'end_date'
    },
    status: {
      type: DataTypes.ENUM('active', 'completed', 'paused')
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  },
  {
    sequelize,
    tableName: 'saving_goals',
    timestamps: true
  }
)
