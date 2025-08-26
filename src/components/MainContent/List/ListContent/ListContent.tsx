import { useMemo } from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import Task from '../../Task/Task/Task'

interface ListContentProps {
  listId: number
}

export default function ListContent({ listId }: ListContentProps) {
  const { tasks } = useAppSelector((state) => state.task)
  const taskContent = useMemo(
    () =>
      tasks[listId] &&
      tasks[listId]
        .filter((task) => task.listId === listId)
        .sort((a, b) => a.orderIndex - b.orderIndex)
        .map((task) => <Task key={task.id} task={task} />),
    [tasks[listId]],
  )
  return <>{taskContent}</>
}
