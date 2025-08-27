import type { ITask } from '../../../api/task/types/task.types'
import { TASK_DND_TYPE } from '../../../constants/dnd.item.type'
import { useImprovedDrop } from '../../../hooks/react-dnd-improved'
import { useRef } from 'react'

type DropZoneProps = React.PropsWithChildren<{
  onDrop: (item: ITask, orderIndex: number) => void
  task?: ITask
}>

function DropZone({ onDrop, children, task }: DropZoneProps) {
  const dropRef = useRef<HTMLDivElement>(null)

  const [{ isOver }, drop] = useImprovedDrop<ITask, void, { isOver: boolean }>({
    accept: TASK_DND_TYPE,
    drop: (item, monitor) => {
      if (!dropRef.current) return

      const rect = dropRef.current.getBoundingClientRect()
      const clientOffset = monitor.getClientOffset()
      if (!clientOffset) return

      const isTopHalf = clientOffset.y < rect.top + rect.height / 2
      const orderIndex = task ? (isTopHalf ? task.orderIndex : task.orderIndex + 1) : 0
      onDrop(item, orderIndex)
      return
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  return (
    <div ref={drop} style={{ backgroundColor: isOver ? 'lightblue' : 'inherit' }}>
      <div ref={dropRef}>{children}</div>
    </div>
  )
}

export default DropZone
