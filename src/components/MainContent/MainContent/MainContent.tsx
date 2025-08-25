import LogSection from '../LogSection/LogSection/LogSection'
import Table from '../Table/Table/Table'
import * as styles from './MainContent.css'

function MainContent() {
  return (
    <div className={styles.mainContent}>
      <Table />
      <LogSection />
    </div>
  )
}

export default MainContent
