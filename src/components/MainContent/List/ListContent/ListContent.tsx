import { useAppSelector } from '../../../../hooks/redux'
import EmptyLayout from '../../../ui/EmptyLayout/EmptyLayout'
import Task from '../../Task/Task/Task'
import * as styles from './ListContent.css'

interface ListContentProps {
  listId: number
}

export default function ListContent({ listId }: ListContentProps) {
  const { tasks } = useAppSelector((state) => state.task)
  return (
    <div className={styles.listContent}>
      <EmptyLayout exist={tasks[listId] != undefined}>
        {tasks[listId] &&
          tasks[listId]
            .filter((task) => task.listId === listId)
            .sort((a, b) => a.orderIndex - b.orderIndex)
            .map((task) => <Task key={task.id} task={task} />)}
      </EmptyLayout>
    </div>
  )
}
