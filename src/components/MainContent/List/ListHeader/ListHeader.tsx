import { useState } from 'react'
import { useAppDispatch } from '../../../../hooks/redux'
import * as styles from './ListHeader.css'
import { useAppSelector } from '../../../../hooks/redux'
import { deleteList, updateList } from '../../../../store/slices/listSlice'
import { addLog } from '../../../../store/slices/logsSlice'

interface ListHeaderProps {
  listId: number
  name: string
}

export default function ListHeader({ listId, name }: ListHeaderProps) {
  const dispatch = useAppDispatch()
  const { selectedTable } = useAppSelector((state) => state.table)
  const { username } = useAppSelector((state) => state.auth)
  const [listName, setListName] = useState(name)

  const handleBlur = async () => {
    if (!listName) {
      setListName(name)
      return
    }
    if (selectedTable && listName !== name) {
      await dispatch(updateList({ tableId: selectedTable.id, listId, body: { name: listName } }))
      await dispatch(addLog({ log: `${username} updated list name to ${listName} in table ${selectedTable.name}` }))
    }
  }

  const handleDelete = async () => {
    if (selectedTable?.id) {
      await dispatch(deleteList({ tableId: selectedTable?.id, listId: listId }))
      await dispatch(addLog({ log: `${username} deleted list ${listName} in table ${selectedTable.name}` }))
    }
  }

  return (
    <div className={styles.listHeader}>
      <input
        type="text"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        onBlur={handleBlur}
        className={styles.listHeaderInput}
      />
      <button className={styles.deleteButton} onClick={handleDelete}>
        X
      </button>
    </div>
  )
}
