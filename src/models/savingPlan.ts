import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/database'
import { planType } from '../common/enums'

export class SavingPlan extends Model {
  declare id: string
  declare goalId: string
  declare planType: planType
  declare amountPerPeriod: number
  declare totalPeriods: number
  declare createdAt: Date
}

SavingPlan.init(
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
    planType: {
      type: DataTypes.STRING,
      field: 'plan_type'
    },
    amountPerPeriod: {
      type: DataTypes.DECIMAL(10, 2),
      field: 'amount_per_period'
    },
    totalPeriods: {
      type: DataTypes.INTEGER,
      field: 'total_periods'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    }
  },
  {
    sequelize,
    tableName: 'saving_plans',
    timestamps: true,
    updatedAt: false
  }
)
