import { useState } from 'react'
import { Calendar, Button, Modal, ScheduleForm } from 'components'
import { useShiftForm } from 'hooks'

const Home: React.FC = () => {
  const { schedule, schedules, onChangeSchedule, onSaveSchedule, onEditSchedule, onDeleteSchedule } = useShiftForm()
  const [modalOpen, setModalOpen] = useState(false)
  const [isEditSchedule, setIsEditSchedule] = useState(false)

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

export default Home