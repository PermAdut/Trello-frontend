import { useAppSelector } from '../../../../hooks/redux'
import * as styles from './LogMenu.css'

export default function LogMenu() {
  const { logs } = useAppSelector((state) => state.logs)

  return (
    <div className={styles.logMenu}>
      {logs.length > 0 ? (
        logs.map((log) => (
          <div key={log.id} className={styles.logItem}>
            <h2 className={styles.logAction}>{log.log}</h2>
            <span className={styles.logTimestamp}>{new Date(log.timestamp).toLocaleString()}</span>
          </div>
        ))
      ) : (
        <div className={styles.noLogs}>No logs available</div>
      )}
    </div>
  )
}
