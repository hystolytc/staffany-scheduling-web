import { useState } from 'react'
import { getCurrTime } from 'utils'

const hours = Array(24).fill(0).map((_, i) => i)
const minutes = ['00', '15', '30', '45']

interface Props {
  name?: string
  value: string
  onChange: (e: any) => void
}

const TimePicker: React.FC<Props> = ({ 
  name,
  value,
  onChange
}) => {
  const [show, setShow] = useState(false)
  const [selectedTime, setSelectedTime] = useState(value)

  const onShow = () => setShow(!show)
  const onSelectTime = (time: string) => {
    const mockEvent = {target: {name: name, value: time}}
    onChange(mockEvent)
    setSelectedTime(time)
    setShow(!show)
  }

  return (
    <div className='relative z-50'>
      <input
        className='h-12 border-2 border-gray-700 px-2 outline-none rounded cursor-pointer'
        type='text'
        size={5}
        value={selectedTime}
        readOnly
        onClick={onShow} />
      
      {show &&
        <div className='absolute flex  flex-col border-2 border-gray-700 h-60 overflow-y-auto rounded z-50 bg-white'>
          {hours.map(h => 
            minutes.map(m => {
              const time = `${h}:${m}`
              return (
                <button
                  className={`p-2 w-20 hover:bg-emerald-300 ${selectedTime === time ? 'bg-emerald-300' : ''}`}
                  onClick={() => onSelectTime(time)}
                >
                  <span>{time}</span>
                </button>
              )
            })
          )}
        </div>
      }
    </div>
  )
}

export default TimePicker