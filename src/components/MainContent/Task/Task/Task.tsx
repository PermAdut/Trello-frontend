import { useState } from 'react'
import type { ITask } from '../../../../api/task/types/task.types'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { updateTask } from '../../../../store/slices/taskSlice'
import ModalTask from '../ModalTask/ModalTask'
import * as styles from './Task.css'
import { useImprovedDrag } from '../../../../hooks/react-dnd-improved'
import { TASK_DND_TYPE } from '../../../../constants/dnd.item.type'
interface TaskProps {
  task: ITask
}

export default function Task({ task }: TaskProps) {
  const dispatch = useAppDispatch()
  const { selectedTable } = useAppSelector((state) => state.table)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [{ isDragging }, drag] = useImprovedDrag<ITask, void, { isDragging: boolean }>({
    type: TASK_DND_TYPE,
    item: task,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

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

  return (
    <>
      <div
        ref={drag}
        className={styles.task}
        onClick={() => setIsModalOpen(true)}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={handleCheckboxChange}
          className={styles.taskCheckbox}
          onClick={(e) => e.stopPropagation()}
        />
        <div className={styles.taskContent}>
          <span className={styles.taskTitle}>{task.title}</span>
          {task.description && <span className={styles.taskDescription}>click to see description</span>}
        </div>
      </div>
      {isModalOpen && <ModalTask task={task} onClose={() => setIsModalOpen(false)} />}
    </>
  )
}
