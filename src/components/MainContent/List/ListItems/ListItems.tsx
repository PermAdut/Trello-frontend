import { useMemo } from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import List from '../List/List'

const ListItems = () => {
  const { lists } = useAppSelector((state) => state.list)
  const { selectedTable } = useAppSelector((state) => state.table)
  const listItems = useMemo(
    () => (
      <>
        {lists
          .filter((list) => list.tableId === selectedTable!.id)
          .sort((a, b) => a.id - b.id)
          .map((list) => (
            <List key={list.id} list={list} />
          ))}
      </>
    ),
    [lists, selectedTable],
  )
  return <>{listItems}</>
}

export default ListItems
