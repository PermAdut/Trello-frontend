import LogHeader from '../LogHeader/LogHeader'
import LogMenu from '../LogMenu/LogMenu'
import * as styles from './LogSection.css'

export default function LogSection() {
  return (
    <div className={styles.logSection}>
      <LogHeader />
      <LogMenu />
    </div>
  )
}
