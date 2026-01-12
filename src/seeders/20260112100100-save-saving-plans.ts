import { QueryInterface } from 'sequelize'

const savingPlans = [
  {
    id: '33333333-3333-3333-3333-333333333333',
    goal_id: '11111111-1111-1111-1111-111111111111',
    plan_type: 'fixed',
    amount_per_period: 1250.0,
    total_periods: 12,
    created_at: new Date()
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    goal_id: '22222222-2222-2222-2222-222222222222',
    plan_type: 'accelerated',
    amount_per_period: 2500.0,
    total_periods: 12,
    created_at: new Date()
  }
]

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.bulkInsert('saving_plans', savingPlans)
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.bulkDelete('saving_plans', { id: savingPlans.map((plan) => plan.id) })
}
