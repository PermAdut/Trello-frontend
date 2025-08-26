import { useMemo } from 'react'
import * as styles from './TableList.css'
import { useAppSelector } from '../../../../hooks/redux'

interface TableListProps {
  handleSelectTable: (tableId: number) => Promise<void>
}

const TableList = ({ handleSelectTable }: TableListProps) => {
  const { tables, selectedTable } = useAppSelector((state) => state.table)

  const tableItems = useMemo(() => {
    return tables.map((table) => (
      <div
        key={table.id}
        className={`${styles.tableItem} ${selectedTable?.id === table.id ? styles.tableItemSelected : ''}`}
        onClick={() => handleSelectTable(table.id)}
      >
        {table.name}
      </div>
    ))
  }, [tables, selectedTable, handleSelectTable])

  return <>{tableItems}</>
}

export default TableList
