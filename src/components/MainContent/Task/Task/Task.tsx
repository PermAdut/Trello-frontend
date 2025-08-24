import { useState } from 'react'
import type { ITask } from '../../../../api/task/types/task.types'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { updateTask } from '../../../../store/slices/taskSlice'
import ModalTask from '../ModalTask/ModalTask'
import * as styles from './Task.css'

interface TaskProps {
  task: ITask
}

export default function Task({ task }: TaskProps) {
  const dispatch = useAppDispatch()
  const { selectedTable } = useAppSelector((state) => state.table)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCheckboxChange = () => {
    if (selectedTable) {
      dispatch(
        updateTask({
          tableId: selectedTable.id,
          listId: task.listId,
          taskId: task.id,
          body: { isCompleted: !task.isCompleted },
        }),
      )
    }
  }

  const handleTaskClick = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <div className={styles.task} onClick={handleTaskClick}>
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={handleCheckboxChange}
          className={styles.taskCheckbox}
          onClick={(e) => e.stopPropagation()}
        />
        <div className={styles.taskContent}>
          <span className={styles.taskTitle}>{task.title}</span>
          {task.description && <span className={styles.taskDescription}>D</span>}
        </div>
      </div>
      {isModalOpen && <ModalTask task={task} onClose={() => setIsModalOpen(false)} />}
    </>
  )
}
