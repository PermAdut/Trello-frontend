import { useState, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { updateTask, deleteTask } from '../../../../store/slices/taskSlice'
import type { ITask } from '../../../../api/task/types/task.types'
import * as styles from './ModalTask.css'

interface ModalTaskProps {
  task: ITask
  onClose: () => void
}

export default function ModalTask({ task, onClose }: ModalTaskProps) {
  const dispatch = useAppDispatch()
  const { selectedTable } = useAppSelector((state) => state.table)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || '')
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  const handleSave = () => {
    if (selectedTable && (title !== task.title || description !== (task.description || ''))) {
      dispatch(
        updateTask({
          tableId: selectedTable.id,
          listId: task.listId,
          taskId: task.id,
          body: { title, description },
        }),
      )
    }
    onClose()
  }

  const handleDelete = () => {
    if (selectedTable) {
      dispatch(
        deleteTask({
          tableId: selectedTable.id,
          listId: task.listId,
          taskId: task.id,
        }),
      )
      onClose()
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={handleClickOutside}>
      <div className={styles.modal} ref={modalRef}>
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
