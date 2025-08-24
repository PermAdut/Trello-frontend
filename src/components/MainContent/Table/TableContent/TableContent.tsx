import { useAppSelector, useAppDispatch } from '../../../../hooks/redux'
import { addOneList } from '../../../../store/slices/listSlice'
import List from '../../List/List/List'
import * as styles from './TableContent.css'

export default function TableContent() {
  const dispatch = useAppDispatch()
  const { lists } = useAppSelector((state) => state.list)
  const { selectedTable } = useAppSelector((state) => state.table)

  const handleAddList = () => {
    if (selectedTable) {
      dispatch(addOneList({ tableId: selectedTable.id, body: { name: 'New List' } }))
    }
  }

  if (!selectedTable) return null

  return (
    <div className={styles.tableContent}>
      <div className={styles.listsContainer}>
        {lists
          .filter((list) => list.tableId === selectedTable.id)
          .sort((a, b) => a.id - b.id)
          .map((list) => (
            <List key={list.id} list={list} />
          ))}
        <button className={styles.addListButton} onClick={handleAddList}>
          + Add another list
        </button>
      </div>
    </div>
  )
}
