import { useAppSelector, useAppDispatch } from '../../../../hooks/redux'
import { getAllLists } from '../../../../store/slices/listSlice'
import { addLog } from '../../../../store/slices/logsSlice'
import { addOneTable, getOneTable } from '../../../../store/slices/tableSlice'
import * as styles from './TableMenu.css'

function TableMenu() {
  const { tables, selectedTable } = useAppSelector((state) => state.table)
  const { username } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const handleAddTable = async () => {
    await dispatch(addOneTable({ name: 'New Table' }))
    await dispatch(addLog({ log: `${username} added new table` }))
  }

  const handleSelectTable = async (tableId: number) => {
    await dispatch(getOneTable(tableId))
    await dispatch(getAllLists(tableId))
    await dispatch(addLog({ log: `${username} selected table ${selectedTable?.name}` }))
  }

  return (
    <div className={styles.tableMenu}>
      {tables.map((table) => (
        <div
          key={table.id}
          className={`${styles.tableItem} ${selectedTable?.id === table.id ? styles.tableItemSelected : ''}`}
          onClick={() => handleSelectTable(table.id)}
        >
          {table.name}
        </div>
      ))}
      <button className={styles.addTableButton} onClick={handleAddTable}>
        +
      </button>
    </div>
  )
}

export default TableMenu
