import { CSSProperties, useState } from 'react'
// import { dayInWeek } from 'constants/index'
import { getCurrDate, getTime, splitByDay } from 'utils'
// import { IDays, ISchedule } from 'interfaces'
import { Calendar, Button, Modal, ScheduleForm } from 'components'
import { useShiftForm } from 'hooks'

const Home: React.FC = () => {
  const { schedule, schedules, onChangeSchedule, onSaveSchedule, onEditSchedule, onDeleteSchedule } = useShiftForm()
  const [modalOpen, setModalOpen] = useState(false)
  const [isEditSchedule, setIsEditSchedule] = useState(false)
  // const currDate = getCurrDate()
  // const dataDividedByDay = splitByDay(schedules)

  const handleModalOpen = (): void => {
    setModalOpen(!modalOpen)
    if (isEditSchedule) setIsEditSchedule(false)
  }

  const handleSave = () => {
    onSaveSchedule()
    handleModalOpen()
  }

  const handleEdit = (id: string) => {
    handleModalOpen()
    setIsEditSchedule(true)
    onEditSchedule(id)
  }

  const handleDelete = () => {
    if (schedule.id) onDeleteSchedule(schedule.id)
    handleModalOpen()
  }

  return (
    <div className='p-4'>
      <div className='p-2 pb-4 mb-6 border-b-2 border-gray-700'>
        <Button
          title='Create Shift'
          onClick={handleModalOpen} />
      </div>

      {/* <div className='px-2 w-full h-screen flex'>

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
      </div> */}

      <Calendar
        data={schedules}
        onEdit={handleEdit} />

      <Modal open={modalOpen}>
        <ScheduleForm
          data={schedule}
          isEdit={isEditSchedule}
          onChange={onChangeSchedule}
          onClose={handleModalOpen}
          onSave={handleSave}
          onDelete={handleDelete} />
      </Modal>
    </div>
  )
}






// interface ICalendar {
//   data: ISchedule[]
//   onEdit?: (v: string) => void
// }

// const Calendar: React.FC<ICalendar> = ({
//   data,
//   onEdit=() =>{}
// }) => {
//   const currDate = getCurrDate()
//   const scheduleByDay = splitByDay(data)

//   return (
//     <div className='w-full flex overflow-x-auto'>
//       <div className='mt-[72px] flex-shrink-0'>
//         <TimeIndicator />
//       </div>

//       <div className='flex-1 flex'>
//         {dayInWeek.map((v, i) => (
//           <CalendarCell
//             key={i}
//             styles={{borderRightWidth: i+1 !== dayInWeek.length ? 0 : ''}}
//             day={v.toUpperCase()}
//             date={currDate.date + ((i+1) - currDate.day)}
//             highlighted={currDate.day === i+1}
//             data={scheduleByDay[v] || []}
//             onClick={(v: string) => onEdit(v)} />
//         ))}
//       </div>
//     </div>
//   )
// }






// interface ICalendarCell {
//   day: string
//   date: number
//   highlighted?: boolean
//   data: ISchedule[]
//   styles?: CSSProperties
//   onClick?: (v: any) => void
// }

// const CalendarCell: React.FC<ICalendarCell> = ({ 
//   day,
//   date,
//   highlighted,
//   data,
//   styles,
//   onClick=()=>{},
// }) => {
//   const o = {} as {[key: number]: ISchedule}
//   data.forEach(v => {
//     const key = getTime(v.startTime).hour
//     o[key] = v
//   })

//   return (
//     <div className='min-w-[150px] w-full'>
//       <div className='flex flex-col items-center'>
//         <span>{day}</span>
//         <div className={`mt-2 mb-4 w-8 h-8 rounded-full flex justify-center items-center ${highlighted && 'bg-emerald-300'}`}>
//           <span>{date}</span>
//         </div>
//       </div>
      
//       <div className='relative'>
//         {Array(24).fill(0).map((_, i) => (
//           <div
//             key={i}
//             style={styles}
//             className={`pr-2 pb-2 relative w-full h-20 border border-slate-300 ${i > 0 && 'border-t-0'}`}
//           >
//             {o[i] && <CalendarCard data={o[i]} onClick={() => onClick(o[i].id)} />}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// interface ICalendarCard {
//   data: ISchedule
//   onClick?: () => void
// }

// const CalendarCard:  React.FC<ICalendarCard> = ({ data, onClick }) => {
//   const startTime = getTime(data.startTime)
//   const endTime = getTime(data.endTime)
//   const paddingBottom = 8
//   const posTop = startTime.minutes / 15 * 20
//   const height = data.duration / 15 * 20 - paddingBottom

//   return (
//     <button
//       style={{ width: `calc(100% - 20px)`, height, top: posTop }}
//       className={'absolute bg-emerald-300 z-10 rounded overflow-y-auto'}
//       onClick={onClick}
//     >
//       <div>
//         <p>{data.title}</p>
//         <p>{startTime.fullDate}</p>
//         <span>
//           {`${startTime.hour}:${startTime.minutes > 0 ? `${startTime.minutes}` : '00'}`} - {`${endTime.hour}:${endTime.minutes > 0 ? `${endTime.minutes}` : '00'}`}
//         </span>
//       </div>
//     </button>
//   )
// }

// const TimeIndicator = () => (
//   <div className='mr-4'>
//     {Array(24).fill(0).map((_, i) => (
//       <div key={i} className='h-20'>
//         {i > 0 && <p className='text-xs text-right'>{i} {i > 11 ? 'PM' : 'AM'}</p>}
//       </div>
//     ))}
//   </div>
// )

export default Home