import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { updateTable, deleteTable, tableActions } from '../../../../store/slices/tableSlice'
import * as styles from './TableHeader.css'
import { addLog } from '../../../../store/slices/logsSlice'

export default function TableHeader() {
  const dispatch = useAppDispatch()
  const { selectedTable } = useAppSelector((state) => state.table)
  const { username } = useAppSelector((state) => state.auth)
  const [name, setName] = useState<string>('')

  useEffect(() => {
    if (selectedTable) setName(selectedTable?.name)
  }, [selectedTable])

  const handleBlur = async () => {
    if (!name && selectedTable) {
      setName(selectedTable?.name)
      return
    }
    if (selectedTable && name !== selectedTable.name) {
      await dispatch(updateTable({ tableId: selectedTable.id, body: { name } }))
      await dispatch(addLog({ log: `${username} updated table name to ${name}` }))
    }
  }

  const handleDelete = async () => {
    if (selectedTable) {
      await dispatch(deleteTable(selectedTable.id))
      await dispatch(addLog({ log: `${username} deleted table ${selectedTable.name}` }))
      await dispatch(tableActions.clearSelectedTable())
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
