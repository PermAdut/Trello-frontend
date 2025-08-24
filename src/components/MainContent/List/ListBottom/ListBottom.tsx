import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import * as styles from './ListBottom.css'
import { addOneTask } from '../../../../store/slices/taskSlice'

interface ListBottomProps {
  listId: number
}

export default function ListBottom({ listId }: ListBottomProps) {
  const dispatch = useAppDispatch()
  const { selectedTable } = useAppSelector((state) => state.table)
  const { tasks } = useAppSelector((state) => state.task)
  const [isAdding, setIsAdding] = useState(false)
  const [taskTitle, setTaskTitle] = useState('New Task')

  const handleAddTask = () => {
    if (selectedTable) {
      const maxOrderIndex = tasks
        .filter((task) => task.listId === listId)
        .reduce((max, task) => Math.max(max, task.orderIndex), 0)
      dispatch(
        addOneTask({
          tableId: selectedTable.id,
          listId,
          body: { title: taskTitle, orderIndex: maxOrderIndex + 1 },
        }),
      )
      setTaskTitle('New Task')
      setIsAdding(false)
    }
  }

  return (
    <div className={styles.listBottom}>
      {isAdding ? (
        <div className={styles.addTaskForm}>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddTask()
              if (e.key === 'Escape') setIsAdding(false)
            }}
            className={styles.addTaskInput}
            autoFocus
          />
          <button className={styles.addTaskButton} onClick={handleAddTask}>
            Add Task
          </button>
        </div>
      ) : (
        <button className={styles.addTaskButton} onClick={() => setIsAdding(true)}>
          + Add another task
        </button>
      )}
    </div>
  )
}
