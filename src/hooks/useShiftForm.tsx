import { ChangeEvent, useState } from 'react'
import produce from 'immer'
import { ISchedule } from 'interfaces'
import { toUnixTimestamp, setHours, getTime, getDurationInMinutes } from 'utils'

const initialSchedule =  {id: '', title: '', date: 0, startTime: 0, endTime: 0, day: '', duration: 0 }

export const useShiftForm = () => {
  const [edit, setEdit] = useState(false)
  const [schedule, setSchedule] = useState<ISchedule>(initialSchedule)
  const [schedules, setSchedules] = useState<ISchedule[]>([])

  const resetSchedule = () => {
    setSchedule(initialSchedule as ISchedule)
  }

  const onChangeSchedule = (e: ChangeEvent<HTMLInputElement>) => {
    const nextSchedule = produce(schedule, draft => {
      const key = e.target.name
      let value: string | number = e.target.value
      if (key === 'date') value = toUnixTimestamp(value)
      if (key.includes('Time')) {
        let time = (value as string).split(':')
        value = setHours(parseInt(time[0]), parseInt(time[1]), draft.date)
      }
      //@ts-ignore
      draft[key] = value
    })
    setSchedule(nextSchedule)
  }

  const onSaveSchedule = () => {
    const nextSchedule = produce(schedule, draft => {
      draft.id = draft.id !== '' ? draft.id : (schedules.length + 1).toString()
      draft.day = getTime(draft.date).dayName
      draft.duration = getDurationInMinutes(draft.startTime, draft.endTime)
    })
    const nextSchedules = produce(schedules, draft => {
      if (edit) {
        const index = schedules.findIndex(v => nextSchedule.id)
        draft[index] = nextSchedule
      } else {
        draft.push(nextSchedule)
      }
    })
    setSchedules(nextSchedules)
    resetSchedule()
    setEdit(false)
  }

  const onEditSchedule = (id: string) => {
    setEdit(true)
    const schedule = schedules.find(v => v.id === id)
    if (schedule) setSchedule(schedule)
  }

  const onDeleteSchedule = (id: string) => {
    const nextSchedules = produce(schedules, draft => {
    const index = schedules.findIndex(v => v.id === id)
      draft.splice(index, 1)
    })
    setSchedules(nextSchedules)
    resetSchedule()
  }

  return {schedule, schedules, onChangeSchedule, onSaveSchedule, onEditSchedule, onDeleteSchedule}
}