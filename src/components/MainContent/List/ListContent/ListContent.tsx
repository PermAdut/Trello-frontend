import { useAppSelector } from '../../../../hooks/redux'
import Task from '../../Task/Task/Task'

interface ListContentProps {
  listId: number
}

export default function ListContent({ listId }: ListContentProps) {
  const { tasks } = useAppSelector((state) => state.task)
  return (
    <>
      {tasks[listId] &&
        tasks[listId]
          .filter((task) => task.listId === listId)
          .sort((a, b) => a.orderIndex - b.orderIndex)
          .map((task) => <Task key={task.id} task={task} />)}
    </>
  )
}
