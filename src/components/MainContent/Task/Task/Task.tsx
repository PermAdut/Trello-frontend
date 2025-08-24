import type { ITask } from '../../../../api/task/types/task.types'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { updateTask } from '../../../../store/slices/taskSlice'

import * as styles from './Task.css'

interface TaskProps {
  task: ITask
}

export default function Task({ task }: TaskProps) {
  const dispatch = useAppDispatch()
  const { selectedTable } = useAppSelector((state) => state.table)

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
    <div className={styles.task}>
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={handleCheckboxChange}
        className={styles.taskCheckbox}
      />
      <div className={styles.taskContent}>
        <span className={styles.taskTitle}>{task.title}</span>
        {task.description && <span className={styles.taskDescription}>{task.description}</span>}
      </div>
    </div>
  )
}
