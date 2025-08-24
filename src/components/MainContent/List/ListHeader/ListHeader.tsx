import { useState } from 'react'
import { useAppDispatch } from '../../../../hooks/redux'
import * as styles from './ListHeader.css'
import { useAppSelector } from '../../../../hooks/redux'
import { deleteList, updateList } from '../../../../store/slices/listSlice'

interface ListHeaderProps {
  listId: number
  name: string
}

export default function ListHeader({ listId, name }: ListHeaderProps) {
  const dispatch = useAppDispatch()
  const { selectedTable } = useAppSelector((state) => state.table)
  const [listName, setListName] = useState(name)

  const handleBlur = () => {
    if (selectedTable && listName !== name) {
      dispatch(updateList({ tableId: selectedTable.id, listId, body: { name: listName } })).unwrap()
    }
  }

  const handleDelete = () => {
    if (selectedTable?.id) dispatch(deleteList({ tableId: selectedTable?.id, listId: listId }))
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
