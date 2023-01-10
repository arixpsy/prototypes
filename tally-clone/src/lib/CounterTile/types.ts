export type ICounter = {
    id: number,
    title: string,
    createdAt: number,
    resetType: string,
    target?: number,
    groupId?: number,
    color: string,
    incrementValue?: number,
    latestRecord: IRecord,
}

export type IRecord = {
  incrementValue: number,
  latestValue: number,
  createdAt: number,
}