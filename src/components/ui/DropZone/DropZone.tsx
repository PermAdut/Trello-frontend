import type { ITask } from '../../../api/task/types/task.types'
import * as styles from '../../MainContent/List/ListContent/ListContent.css'
import { useRef } from 'react'
import { useImprovedDrop } from '../../../hooks/react-dnd-improved'
type DropZoneProps = React.PropsWithChildren<{
  onDrop: (item: ITask, orderIndex: number) => void
}>
function DropZone({ onDrop, children }: DropZoneProps) {
  const dropRef = useRef<HTMLDivElement>(null)
  const [{ isOver, dropCoordinate }, drop] = useImprovedDrop<
    ITask,
    void,
    { isOver: boolean; dropCoordinate: number | null }
  >({
    accept: 'TASK',
    drop: (item) => {
      onDrop(item, 0)
      console.log(dropCoordinate)
      return
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      dropCoordinate: monitor.getDropResult(),
    }),
  })
  return (
    <div ref={drop} className={styles.listContent} style={{ backgroundColor: isOver ? 'lightblue' : 'white' }}>
      <div ref={dropRef}>{children}</div>
    </div>
  )
}

export default DropZone
