export type ICounter = {
    id: string,
    title: string,
    createdAt: number,
    resetType: string,
    target?: number,
    groupId?: number,
    color: string,
    incrementValue?: number,
}

export type IRecord = {
  counterId: string,
  incrementValue: number,
  latestValue: number,
  createdAt: number,
}