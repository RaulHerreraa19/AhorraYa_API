import { QueryInterface } from 'sequelize'

const savingGoals = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    user_id: 1,
    title: 'Fondo de emergencia',
    target_amount: 15000.0,
    start_date: '2025-01-15',
    end_date: '2025-12-15',
    status: 'active',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    user_id: 1,
    title: 'Viaje familiar',
    target_amount: 30000.0,
    start_date: '2025-03-01',
    end_date: '2025-11-30',
    status: 'active',
    created_at: new Date(),
    updated_at: new Date()
  }
]

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.bulkInsert('saving_goals', savingGoals)
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.bulkDelete('saving_goals', { id: savingGoals.map((goal) => goal.id) })
}
