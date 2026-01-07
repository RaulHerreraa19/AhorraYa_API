
export enum goalStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum planType {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly'
}

export enum source {
  BANK_TRANSFER = 'bank_transfer',
  CASH = 'cash',
  OTHER = 'other'
}

export enum typeOfResponse {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  EXCEPTION = 'EXCEPTION'
}
