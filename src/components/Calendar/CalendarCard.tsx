import { ISchedule } from 'interfaces'
import { getTime } from 'utils'

interface Props {
  data: ISchedule
  onClick?: () => void
}

const CalendarCard:  React.FC<Props> = ({ data, onClick }) => {
  const startTime = getTime(data.startTime)
  const endTime = getTime(data.endTime)
  const paddingBottom = 8
  const posTop = startTime.minutes / 15 * 20
  const height = data.duration / 15 * 20 - paddingBottom

  return (
    <button
      style={{ width: `calc(100% - 20px)`, height, top: posTop }}
      className={'absolute bg-emerald-300 z-10 rounded overflow-y-auto'}
      onClick={onClick}
    >
      <div>
        <p>{data.title}</p>
        <p>{startTime.fullDate}</p>
        <span>
          {`${startTime.hour}:${startTime.minutes > 0 ? `${startTime.minutes}` : '00'}`} - {`${endTime.hour}:${endTime.minutes > 0 ? `${endTime.minutes}` : '00'}`}
        </span>
      </div>
    </button>
  )
}

export default CalendarCard
