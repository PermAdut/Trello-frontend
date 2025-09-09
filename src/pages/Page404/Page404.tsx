import { useNavigate } from 'react-router'
import * as styles from './Page404.css'
export default function Page404() {
  const navigate = useNavigate()
  return (
    <div className={styles.centerContainer}>
      <h1 className={styles.heading}>Error 404</h1>
      <h3>Not found</h3>
      <p>This page does not exit</p>
      <button className={styles.button} onClick={() => navigate('/')}>
        Go to the main page
      </button>
    </div>
  )
}
