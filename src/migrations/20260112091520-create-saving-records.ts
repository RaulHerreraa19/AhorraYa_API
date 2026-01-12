import { DataTypes, QueryInterface } from 'sequelize'

const tableName = 'saving_records'

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
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    record_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    source: {
      type: DataTypes.STRING,
      allowNull: true
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
