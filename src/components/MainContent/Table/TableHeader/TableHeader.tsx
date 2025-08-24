import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { updateTable, deleteTable, tableActions } from '../../../../store/slices/tableSlice'
import * as styles from './TableHeader.css'

export default function TableHeader() {
  const dispatch = useAppDispatch()
  const { selectedTable } = useAppSelector((state) => state.table)
  const [name, setName] = useState(selectedTable?.name || '')

  const handleBlur = () => {
    if (selectedTable && name !== selectedTable.name) {
      dispatch(updateTable({ tableId: selectedTable.id, body: { name } }))
    }
  }

  const handleDelete = () => {
    if (selectedTable) {
      dispatch(deleteTable(selectedTable.id))
      dispatch(tableActions.clearSelectedTable())
    }
  }

  if (!selectedTable) return null

  return (
    <div className={styles.tableHeader}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={handleBlur}
        className={styles.tableHeaderInput}
      />
      <button className={styles.deleteButton} onClick={handleDelete}>
        X
      </button>
    </div>
  )
}
