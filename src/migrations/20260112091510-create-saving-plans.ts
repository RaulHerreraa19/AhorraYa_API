import { DataTypes, QueryInterface } from 'sequelize'

const tableName = 'saving_plans'

export async function up (queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable(tableName, {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    goal_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'saving_goals',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    plan_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount_per_period: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    total_periods: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  })
}

export async function down (queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable(tableName)
}
