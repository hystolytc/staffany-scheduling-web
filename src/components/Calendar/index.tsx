import { ISchedule } from 'interfaces'
import { getCurrDate, splitByDay } from 'utils'
import { dayInWeek } from 'constants/index'
import TimeIndicator from './TimeIndicator'
import CalendarCell from './CalendarCell'

interface Props {
  data: ISchedule[]
  onEdit?: (v: string) => void
}

export const Calendar: React.FC<Props> = ({
  data,
  onEdit=() =>{}
}) => {
  const currDate = getCurrDate()
  const scheduleByDay = splitByDay(data)

  return (
    <div className='w-full flex overflow-x-auto'>
      <div className='mt-[72px] flex-shrink-0'>
        <TimeIndicator />
      </div>

      <div className='flex-1 flex'>
        {dayInWeek.map((v, i) => (
          <CalendarCell
            key={i}
            styles={{borderRightWidth: i+1 !== dayInWeek.length ? 0 : ''}}
            day={v.toUpperCase()}
            date={currDate.date + ((i+1) - currDate.day)}
            highlighted={currDate.day === i+1}
            data={scheduleByDay[v] || []}
            onClick={(v: string) => onEdit(v)} />
        ))}
      </div>
    </div>
  )
}