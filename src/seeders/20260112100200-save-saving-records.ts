import { QueryInterface } from 'sequelize'

const savingRecords = [
  {
    id: '55555555-5555-5555-5555-555555555555',
    goal_id: '11111111-1111-1111-1111-111111111111',
    amount: 1250.0,
    record_date: '2025-02-01',
    source: 'Deposito mensual',
    created_at: new Date()
  },
  {
    id: '66666666-6666-6666-6666-666666666666',
    goal_id: '22222222-2222-2222-2222-222222222222',
    amount: 2500.0,
    record_date: '2025-03-05',
    source: 'Transferencia',
    created_at: new Date()
  }
]

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.bulkInsert('saving_records', savingRecords)
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.bulkDelete('saving_records', { id: savingRecords.map((record) => record.id) })
}
