import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import * as styles from './ListBottom.css'
import { addOneTask } from '../../../../store/slices/taskSlice'
import { addLog } from '../../../../store/slices/logsSlice'
import { getOneList } from '../../../../store/slices/listSlice'

interface ListBottomProps {
  listId: number
}

export default function ListBottom({ listId }: ListBottomProps) {
  const dispatch = useAppDispatch()
  const { username } = useAppSelector((state) => state.auth)
  const { selectedTable } = useAppSelector((state) => state.table)
  const { tasks } = useAppSelector((state) => state.task)
  const [isAdding, setIsAdding] = useState(false)
  const [taskTitle, setTaskTitle] = useState('New Task')

  const handleAddTask = async () => {
    if (selectedTable) {
      const maxOrderIndex = tasks[listId]
        .filter((task) => task.listId === listId)
        .reduce((max, task) => Math.max(max, task.orderIndex), 0)
      await dispatch(
        addOneTask({
          tableId: selectedTable.id,
          listId,
          body: { title: taskTitle, orderIndex: maxOrderIndex + 1 },
        }),
      )
      const result = await dispatch(getOneList({ tableId: selectedTable.id, listId }))
      if (getOneList.fulfilled.match(result)) {
        await dispatch(
          addLog({
            log: `${username} added task with title ${taskTitle} to list ${result.payload.name} in board ${selectedTable.name}`,
          }),
        )
      }
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
