import TimePicker from '../TimePicker'
import close from 'assets/close.svg'
import bin from 'assets/bin.svg'
import { ISchedule } from 'interfaces'
import { getTime } from 'utils'

interface Props {
  title?: string
  data: ISchedule
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClose?: () => void
  onDelete?: () => void,
  onSave?: () => void
}

export const ScheduleForm: React.FC<Props> = ({
  title,
  data,
  onChange,
  onClose,
  onDelete,
  onSave
}) => {
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (onSave) onSave()
  }

  return (
    <>
      <div className='h-12 mb-4 flex justify-between items-center'>
        <h2 className='flex-1 font-bold text-xl'>{title}</h2>
        <div>
          <button
            className='p-2 h-10 w-10 mr-4'
            onClick={onDelete}
          >
            <img src={bin} alt='icon delete' />
          </button>

          <button
            className='p-2'
            onClick={onClose}
          >
            <img src={close} alt='icon close' />
          </button>
        </div>
      </div>
      
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <label 
          htmlFor='title'
          className='text-xs text-gray-700 font-semibold mb-1'
        >
          Title
        </label>
        <input
          id='title'
          className='border-2 border-gray-700 p-2 outline-none rounded'
          name='title'
          type='text' 
          placeholder='Title' 
          value={data.title} 
          onChange={onChange} />

        <br/>
        
        <div>
          <label
            htmlFor='date'
            className='block text-xs text-gray-700 font-semibold mb-1'
          >
            Date
          </label>
          <input
            id='date'
            className='h-12 border-2 border-gray-700 px-2 outline-none rounded'
            name='date'
            type='date'
            value={data.date > 0 ? getTime(data.date).yearDate : ''}
            onChange={onChange}
            min='' />
        </div>
        <br/>

        <div className='flex'>
          <div className='mr-8'>
            <label
              htmlFor='date'
              className='block text-xs text-gray-700 font-semibold mb-1'
            >
              Start Time
            </label>
            <TimePicker
              name='startTime'
              value={data.startTime > 0 ? getTime(data.startTime).hourMinutes : ''}
              onChange={onChange} />
          </div>
          <div>
            <label
              htmlFor='date'
              className='block text-xs text-gray-700 font-semibold mb-1'
            >
              End Time
            </label>
            <TimePicker
              name='endTime'
              value={data.endTime > 0 ? getTime(data.endTime).hourMinutes : ''}
              onChange={onChange} />
          </div>
        </div>

        <br/>
        <br/>

        <div className='text-right'> 
          <button 
            className='p-2 bg-emerald-300 rounded border-2 border-gray-700 font-semibold'
            type='submit'>
            Create
          </button>
        </div>
      </form>
    </>
  )
}
