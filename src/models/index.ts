import { User } from './userModel'
import { SavingGoal } from './savingGoal'
import { SavingPlan } from './savingPlan'
import { SavingRecord } from './savingRecord'

User.hasMany(SavingGoal, { foreignKey: 'user_id' })
SavingGoal.belongsTo(User, { foreignKey: 'user_id' })

SavingGoal.hasMany(SavingPlan, { foreignKey: 'goal_id' })
SavingPlan.belongsTo(SavingGoal, { foreignKey: 'goal_id' })

SavingGoal.hasMany(SavingRecord, { foreignKey: 'goal_id' })
SavingRecord.belongsTo(SavingGoal, { foreignKey: 'goal_id' })
