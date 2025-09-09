import Header from '../../components/Header/Header'
import useInitialData from '../../hooks/useInitialData'
import { useAppSelector } from '../../hooks/redux'
import MainContent from '../../components/MainContent/MainContent/MainContent'

function MainPage() {
  const { username } = useAppSelector((state) => state.auth)
  const { isLoading, error } = useInitialData()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <>
      <Header username={username} />
      <MainContent />
    </>
  )
}

export default MainPage
