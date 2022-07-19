import axios from 'axios'
import { ISchedule } from 'interfaces'
const fetch = axios.create({ baseURL: process.env.REACT_APP_BASE_URL })

export const getSchedules = async (): Promise<any> => {
  try {
    const res = await fetch({
      method: 'GET',
      url: '/schedule'
    })
    return res.data.data
  } catch (ex) {
    throw ex
  }
}

export const postSchedule = async (schedule: ISchedule): Promise<any> => {
  try {
    const res = await fetch({
      method: 'POST',
      url: '/schedule',
      data: schedule
    })

    return res
  } catch (ex) {
    throw ex
  }
}

export const putSchedule = async (schedule: ISchedule): Promise<any> => {
  try {
    const res = await fetch({
      method: 'PUT',
      url: `/schedule/${schedule.id}`,
      data: schedule
    })

    return res
  } catch (ex) {
    throw ex
  }
}

export const deleteSchedule = async (id: string): Promise<any> => {
  try {
    await fetch({
      method: 'DELETE',
      url: `/schedule/${id}`
    })
  } catch (ex) {
    throw ex
  }
}