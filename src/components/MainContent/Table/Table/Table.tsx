import TableContent from '../TableContent/TableContent'
import TableHeader from '../TableHeader/TableHeader'
import TableMenu from '../TableMenu/TableMenu'
import * as styles from './Table.css'
function Table() {
  return (
    <div className={styles.table}>
      <TableHeader />
      <TableContent />
      <TableMenu />
    </div>
  )
}

export default Table
