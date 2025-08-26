import { useAppSelector, useAppDispatch } from '../../../../hooks/redux'
import { getAllLists } from '../../../../store/slices/listSlice'
import { addLog } from '../../../../store/slices/logsSlice'
import { addOneTable, getOneTable } from '../../../../store/slices/tableSlice'
import * as styles from './TableMenu.css'
import TableList from '../TableList/TableList'
import { useCallback } from 'react'

function TableMenu() {
  const { username } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const handleAddTable = async () => {
    const result = await dispatch(addOneTable({ name: 'New Table' }))
    if (addOneTable.fulfilled.match(result)) {
      await dispatch(addLog({ log: `${username} added new table ${result.payload.name}` }))
    }
  }

  const handleSelectTable = useCallback(
    async (tableId: number) => {
      const result = await dispatch(getOneTable(tableId))
      await dispatch(getAllLists(tableId))
      if (getOneTable.fulfilled.match(result)) {
        await dispatch(addLog({ log: `${username} selected table ${result.payload.name}` }))
      }
    },
    [dispatch, username],
  )

  return (
    <div className={styles.tableMenu}>
      <TableList handleSelectTable={handleSelectTable} />
      <button className={styles.addTableButton} onClick={handleAddTable}>
        +
      </button>
    </div>
  )
}

export default TableMenu
