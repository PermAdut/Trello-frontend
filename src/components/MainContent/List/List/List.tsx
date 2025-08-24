import type { IList } from '../../../../api/list/types/list.types'
import ListHeader from '../ListHeader/ListHeader'
import ListContent from '../ListContent/ListContent'
import ListBottom from '../ListBottom/ListBottom'
import * as styles from './List.css'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { getAllTasks } from '../../../../store/slices/taskSlice'

interface ListProps {
  list: IList
}

export default function List({ list }: ListProps) {
  const dispatch = useAppDispatch()
  const { selectedTable } = useAppSelector((state) => state.table)

  useEffect(() => {
    if (selectedTable?.id) {
      dispatch(getAllTasks({ tableId: selectedTable.id, listId: list.id }))
    }
  }, [dispatch, selectedTable, list.id])

  return (
    <div className={styles.list}>
      <ListHeader listId={list.id} name={list.name} />
      <ListContent listId={list.id} />
      <ListBottom listId={list.id} />
    </div>
  )
}
