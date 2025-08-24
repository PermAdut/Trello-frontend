import { useNavigate } from 'react-router'
import { authActions } from '../../store/slices/authSlice'
import * as styles from './Header.css'
import { useAppDispatch } from '../../hooks/redux'
interface HeaderProps {
  username: string | null
}

export default function Header({ username }: HeaderProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(authActions.logoutUser())
    navigate('/login')
  }
  if (!username) return <></>
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <h1 className={styles.headerTitle}>smallTrello</h1>
      </div>
      <div className={styles.headerRight}>
        <span className={styles.headerUsername}>Username: {username}</span>
        <button className={styles.headerLogout} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}
