import { useAppSelector, useAppDispatch } from '../../../../hooks/redux'
import { addOneList } from '../../../../store/slices/listSlice'
import { addLog } from '../../../../store/slices/logsSlice'
import * as styles from './TableContent.css'
import ListItems from '../../List/ListItems/ListItems'
import EmptyLayout from '../../../ui/EmptyLayout/EmptyLayout'

export default function TableContent() {
  const dispatch = useAppDispatch()
  const { selectedTable } = useAppSelector((state) => state.table)
  const { username } = useAppSelector((state) => state.auth)

  const handleAddList = async () => {
    if (selectedTable) {
      await dispatch(addOneList({ tableId: selectedTable.id, body: { name: 'New List' } }))
      await dispatch(addLog({ log: `${username} added New List to ${selectedTable.name} table` }))
    }
  }

  return (
    <div className={styles.tableContent}>
      <div className={styles.listsContainer}>
        <EmptyLayout exist={selectedTable !== null} notExistedComponent={<></>}>
          <ListItems />
          <button className={styles.addListButton} onClick={handleAddList}>
            + Add another list
          </button>
        </EmptyLayout>
      </div>
    </div>
  )
}
