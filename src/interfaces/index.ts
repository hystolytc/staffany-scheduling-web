export interface ISchedule {
  id?: string
  title: string
  date: number
  startTime: number,
  endTime: number,
  day: string,
  duration: number
}

export interface IDays {
  [x: string]: ISchedule[]
}