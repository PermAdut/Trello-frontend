import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { updateTask, deleteTask } from '../../../../store/slices/taskSlice'
import type { ITask } from '../../../../api/task/types/task.types'
import * as styles from './ModalTask.css'
import { addLog } from '../../../../store/slices/logsSlice'

interface ModalTaskProps {
  task: ITask
  onClose: () => void
}

export default function ModalTask({ task, onClose }: ModalTaskProps) {
  const dispatch = useAppDispatch()
  const { selectedTable } = useAppSelector((state) => state.table)
  const { username } = useAppSelector((state) => state.auth)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || '')

  const handleSave = async () => {
    if (selectedTable && (title !== task.title || description !== (task.description || ''))) {
      await dispatch(
        updateTask({
          tableId: selectedTable.id,
          listId: task.listId,
          taskId: task.id,
          body: { title, description },
        }),
      )
      await dispatch(addLog({ log: `${username} updated task ${title} using modal window` }))
    }
    onClose()
  }

  const handleDelete = async () => {
    if (selectedTable) {
      await dispatch(
        deleteTask({
          tableId: selectedTable.id,
          listId: task.listId,
          taskId: task.id,
        }),
      )
      await dispatch(addLog({ log: `${username} deleted task ${title}` }))
      onClose()
    }
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.modalTitleInput}
            autoFocus
          />
          <button className={styles.closeButton} onClick={onClose}>
            X
          </button>
        </div>
        <div className={styles.modalBody}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.modalDescriptionInput}
            placeholder="Add a description..."
          />
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.saveButton} onClick={handleSave}>
            Save
          </button>
          <button className={styles.deleteButton} onClick={handleDelete}>
            Delete Task
          </button>
        </div>
      </div>
    </div>
  )
}
