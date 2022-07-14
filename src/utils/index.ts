import { ISchedule, IDays } from 'interfaces'
import { dayInWeek } from 'constants/index'

const formatMinutes = (minutes: number): string => {
  if (minutes < 15) return '15'
  if (minutes < 30) return '30'
  if (minutes < 45) return '45'
  return '00'
}

export const getCurrDate = () => {
  const date = new Date()
  return {
    day: date.getDay(),
    date: date.getDate()
  }
}

export const getCurrTime = () => {
  const date = new Date()
  const hour = date.getHours()
  const minutes = formatMinutes(date.getMinutes())
  const timeFormat = `${hour}:${minutes}`
  return {
    hour,
    minutes,
    timeFormat
  }
}

export const getTime = (timeStamp: number) => {
  const date = new Date(timeStamp * 1000)
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const hourMinutes = `${hour}:${minutes === 0 ? '00' : minutes}`
  return {
    hour,
    minutes,
    yearDate: date.toISOString().slice(0, 10),
    dayName: dayInWeek[date.getDay() - 1],
    hourMinutes
  }
}

export const splitByDay = (data: ISchedule[]): IDays => {
  const o = {} as IDays
  data.forEach(v => {
    const day = v.day
    if (o[day]) {
      o[day].push(v)
      return
    }

    o[day] = [v]
  })
  return o
}

export const toUnixTimestamp = (date: string): number => {
  return (new Date(date).getTime() / 1000)
}

export const setHours = (hour: number, minutes: number, date?: number) => {
  let updatedDate = date ? new Date(date * 1000) : new Date()
  updatedDate.setHours(hour, minutes)
  return toUnixTimestamp(updatedDate.toISOString())
}

export const getDurationInMinutes = (startTime: number, endTime: number) => {
  return (endTime - startTime) / 60
}