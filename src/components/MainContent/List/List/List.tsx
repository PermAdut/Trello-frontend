import type { IList } from '../../../../api/list/types/list.types'
import ListHeader from '../ListHeader/ListHeader'
import ListContent from '../ListContent/ListContent'
import ListBottom from '../ListBottom/ListBottom'
import * as styles from './List.css'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { getAllTasks, moveTask } from '../../../../store/slices/taskSlice'
import type { ITask } from '../../../../api/task/types/task.types'
import DropZone from '../../../ui/DropZone/DropZone'
import EmptyLayout from '../../../ui/EmptyLayout/EmptyLayout'

interface ListProps {
  list: IList
}

export default function List({ list }: ListProps) {
  const dispatch = useAppDispatch()
  const { selectedTable } = useAppSelector((state) => state.table)
  const { tasks } = useAppSelector((state) => state.task)

  const handleDrop = async (movedTask: ITask, taskOrderIndex: number) => {
    const sourceListId = movedTask.listId
    const targetListId = list.id
    const sourceTasks = tasks[sourceListId]
    const targetTasks = tasks[targetListId]

    let newTaskOrder: ITask[]
    let updatedMovedTask: ITask

    if (sourceListId === targetListId) {
      newTaskOrder = Array.from(sourceTasks)
      const movedTaskIndex = newTaskOrder.findIndex((t) => t.id === movedTask.id)
      newTaskOrder.splice(movedTaskIndex, 1)
      newTaskOrder.splice(taskOrderIndex, 0, movedTask)
      newTaskOrder = newTaskOrder.map((task, index) => ({
        ...task,
        orderIndex: index,
      }))
      updatedMovedTask = { ...movedTask, orderIndex: taskOrderIndex }
    } else {
      const targetTaskOrder = [...targetTasks]
      targetTaskOrder.splice(taskOrderIndex, 0, { ...movedTask, listId: targetListId })
      newTaskOrder = targetTaskOrder.map((task, index) => ({
        ...task,
        orderIndex: index,
      }))
      updatedMovedTask = { ...movedTask, listId: targetListId, orderIndex: taskOrderIndex }
    }
    await dispatch(
      moveTask({
        tableId: list.tableId,
        body: {
          tasks: newTaskOrder,
          movedTask: updatedMovedTask,
          sourceListId,
        },
      }),
    )

    await dispatch(getAllTasks({ tableId: list.tableId, listId: targetListId }))
    if (sourceListId !== targetListId) await dispatch(getAllTasks({ tableId: list.tableId, listId: sourceListId }))
  }

  useEffect(() => {
    if (selectedTable?.id) {
      dispatch(getAllTasks({ tableId: selectedTable.id, listId: list.id }))
    }
  }, [dispatch, selectedTable, list.id])

  return (
    <div className={styles.list}>
      <ListHeader listId={list.id} name={list.name} />
      <DropZone onDrop={handleDrop}>
        <EmptyLayout
          notExistedComponent={<span className={styles.noContent}>No tasks</span>}
          exist={!!tasks[list.id]?.length}
        >
          <ListContent listId={list.id} />
        </EmptyLayout>
      </DropZone>
      <ListBottom listId={list.id} />
    </div>
  )
}
