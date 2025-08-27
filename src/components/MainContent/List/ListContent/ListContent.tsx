import { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import Task from '../../Task/Task/Task'
import type { IList } from '../../../../api/list/types/list.types'
import type { ITask } from '../../../../api/task/types/task.types'
import { getAllTasks, moveTask } from '../../../../store/slices/taskSlice'
import { addLog } from '../../../../store/slices/logsSlice'
import DropZone from '../../../ui/DropZone/DropZone'
import EmptyLayout from '../../../ui/EmptyLayout/EmptyLayout'
import * as styles from './ListContent.css'
interface ListContentProps {
  list: IList
}

export default function ListContent({ list }: ListContentProps) {
  const dispatch = useAppDispatch()
  const { tasks } = useAppSelector((state) => state.task)
  const { username } = useAppSelector((state) => state.auth)

  const handleDrop = useCallback(
    async (movedTask: ITask, taskOrderIndex: number) => {
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
      await dispatch(addLog({ log: `${username} dragged task ${movedTask.title} to list ${list.name}` }))
      await dispatch(getAllTasks({ tableId: list.tableId, listId: targetListId }))
      if (sourceListId !== targetListId) await dispatch(getAllTasks({ tableId: list.tableId, listId: sourceListId }))
    },
    [tasks, dispatch, list, username],
  )

  const taskContent = useMemo(
    () =>
      tasks[list.id] &&
      tasks[list.id]
        .filter((task) => task.listId === list.id)
        .sort((a, b) => a.orderIndex - b.orderIndex)
        .map((task) => (
          <DropZone key={task.id} onDrop={handleDrop} task={task}>
            <Task key={task.id} task={task} />
          </DropZone>
        )),
    [tasks[list.id]],
  )
  return (
    <div className={styles.listContent}>
      <EmptyLayout
        notExistedComponent={
          <DropZone onDrop={handleDrop}>
            <span className={styles.noContent}>No tasks</span>
          </DropZone>
        }
        exist={!!tasks[list.id]?.length}
      >
        {taskContent}
      </EmptyLayout>
    </div>
  )
}
