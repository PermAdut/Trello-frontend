import LogSection from '../LogSection/LogSection/LogSection'
import Table from '../Table/Table/Table'
import * as styles from './MainContent.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
function MainContent() {
  return (
    <div className={styles.mainContent}>
      <DndProvider backend={HTML5Backend}>
        <Table />
      </DndProvider>
      <LogSection />
    </div>
  )
}

export default MainContent
