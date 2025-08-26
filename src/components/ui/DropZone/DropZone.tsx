import type { ITask } from '../../../api/task/types/task.types'
import { useImprovedDrop } from '../../../hooks/react-dnd-improved'
import * as styles from './DropZone.css'

type DropZoneProps = React.PropsWithChildren<{
  onDrop: (item: ITask, orderIndex: number) => void
}>

function DropZone({ onDrop, children }: DropZoneProps) {
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
    <div ref={drop} className={styles.listContent} style={{ backgroundColor: isOver ? 'lightblue' : 'inherit' }}>
      <div>{children}</div>
    </div>
  )
}

export default DropZone
