import { useAppSelector, useAppDispatch } from '../../../../hooks/redux'
import { addOneTable, tableActions } from '../../../../store/slices/tableSlice'
import * as styles from './TableMenu.css'

function TableMenu() {
  const { tables, selectedTable } = useAppSelector((state) => state.table)
  const dispatch = useAppDispatch()

  const handleAddTable = () => {
    dispatch(addOneTable({ name: 'New Table' }))
  }

  const handleSelectTable = (tableId: number) => {
    dispatch(tableActions.setSelectedTable(tableId))
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
