import { ISchedule } from 'interfaces'
import { getTime } from 'utils'
import CalendarCard from './CalendarCard'

interface Props {
  day: string
  date: number
  highlighted?: boolean
  data: ISchedule[]
  styles?: React.CSSProperties
  onClick?: (v: any) => void
}

const CalendarCell: React.FC<Props> = ({ 
  day,
  date,
  highlighted,
  data,
  styles,
  onClick=()=>{},
}) => {
  const o = {} as {[key: number]: ISchedule}
  data.forEach(v => {
    const key = getTime(v.startTime).hour
    o[key] = v
  })

  return (
    <div className='min-w-[150px] w-full'>
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
            style={styles}
            className={`pr-2 pb-2 relative w-full h-20 border border-slate-300 ${i > 0 && 'border-t-0'}`}
          >
            {o[i] && <CalendarCard data={o[i]} onClick={() => onClick(o[i].id)} />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CalendarCell
