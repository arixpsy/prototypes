type ObjectValues<T> = T[keyof T]

export const RESET_TYPE = {
  DAY: 'Day',
  WEEK: 'Week',
  MONTH: 'Month',
  YEAR: 'Year',
  NEVER: 'Never'
} as const

export type IResetType = ObjectValues<typeof RESET_TYPE>

export type ICounter = {
    id: string,
    title: string,
    createdAt: number,
    resetType: IResetType,
    target?: number,
    color: string,
    incrementValue?: number,
}

export type IRecord = {
  counterId: string,
  incrementValue: number,
  latestValue: number,
  createdAt: number,
}