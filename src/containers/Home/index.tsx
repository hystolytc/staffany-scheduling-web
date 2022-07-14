import { useState } from 'react'
import { dayInWeek } from 'constants/index'
import { getCurrDate, getTime, splitByDay } from 'utils'
import { ISchedule } from 'interfaces'
import { Button, Modal, ScheduleForm } from 'components'
import { useShiftForm } from 'hooks'

const Home = () => {
  const { schedule, schedules, onChangeSchedule, onSaveSchedule, onEditSchedule, onDeleteSchedule } = useShiftForm()
  const [modalOpen, setModalOpen] = useState(false)
  const currDate = getCurrDate()
  const dataDividedByDay = splitByDay(schedules)

  const handleModalOpen = (): void => {
    setModalOpen(!modalOpen)
  }
  
  const handleSave = () => {
    onSaveSchedule()
    handleModalOpen()
  }

  const handleEdit = (id: string) => {
    handleModalOpen()
    onEditSchedule(id)
  }

  const handleDelete = () => {
    if (schedule.id) onDeleteSchedule(schedule.id)
    handleModalOpen()
  }

  console.log(schedule)
  console.log('----->', schedules)

  return (
    <div className='p-4'>
      <div className='p-2 bg-orange-300 mb-6'>
        <Button
          title='Create Shift'
          onClick={handleModalOpen} />

        <Button title='Today' />
      </div>

      <div className='px-2 w-full h-screen flex'>

        <div className='mt-[72px] flex-shrink-0'>
          <TimeIndicator />
        </div>

        <div className='flex-1 flex'>
          {dayInWeek.map((v, i) => (
            <CalendarCell
              key={i}
              day={v.toUpperCase()}
              date={i+11}
              highlighted={currDate.day === i+1 && currDate.date === i + 11}
              data={dataDividedByDay[v] || []}
              onClick={(v: string) => handleEdit(v)} />
          ))}
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={handleModalOpen}
      >
        <ScheduleForm
          title='Create Shift'
          data={schedule}
          onChange={onChangeSchedule}
          onClose={handleModalOpen}
          onSave={handleSave}
          onDelete={handleDelete} />
      </Modal>
    </div>
  )
}













interface ICalendarCell {
  day: string
  date: number
  highlighted?: boolean
  data: ISchedule[]
  onClick?: (v: any) => void
}

const CalendarCell: React.FC<ICalendarCell> = ({ day, date, highlighted, data, onClick = () =>{} }) => {
  const o = {} as {[key: number]: ISchedule}
  data.forEach(v => {
    const key = getTime(v.startTime).hour
    o[key] = v
  })

  return (
    <div className='w-full'>
      <div className='flex flex-col items-center'>
        <span>{day}</span>
        <div className={`mt-2 mb-4 w-8 h-8 rounded-full flex justify-center items-center ${highlighted && 'bg-emerald-300'}`}>
          <span>{date}</span>
        </div>
      </div>
      
      <div className='relative'>
        {Array(24).fill(0).map((_, i) => (
          <div
            key={i}
            className={`pr-2 pb-2 relative w-full h-20 border border-slate-300 ${i > 0 && 'border-t-0'}`}
          >
            {o[i] && <CalendarCard data={o[i]} onClick={() => onClick(o[i].id)} />}
          </div>
        ))}
      </div>
    </div>
  )
}

interface ICalendarCard {
  data: ISchedule
  onClick?: () => void
}

const CalendarCard:  React.FC<ICalendarCard> = ({ data, onClick }) => {
  const startTime = getTime(data.startTime)
  const endTime = getTime(data.endTime)
  const paddingBottom = 8
  const posTop = startTime.minutes / 15 * 20
  const height = data.duration / 15 * 20 - paddingBottom
  return (
    <button
      style={{ width: `calc(100% - 20px)`, height, top: posTop }}
      className={'absolute bg-emerald-300 z-10 rounded'}
      onClick={onClick}
    >
      <div>
        <p>{data.title}</p>
        <span>
          {`${startTime.hour}:${startTime.minutes > 0 ? `${startTime.minutes}` : '00'}`} - {`${endTime.hour}:${endTime.minutes > 0 ? `${endTime.minutes}` : '00'}`}
        </span>
      </div>
    </button>
  )
}

const TimeIndicator = () => (
  <div className='mr-4'>
    {Array(24).fill(0).map((_, i) => (
      <div key={i} className='h-20'>
        {i > 0 && <p className='text-xs text-right'>{i} {i > 11 ? 'PM' : 'AM'}</p>}
      </div>
    ))}
  </div>
)

export default Home