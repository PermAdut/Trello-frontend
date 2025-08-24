import Header from '../../components/Header/Header'
import TableContent from '../../components/MainContent/Table/TableContent/TableContent'
import TableHeader from '../../components/MainContent/Table/TableHeader/TableHeader'
import TableMenu from '../../components/MainContent/Table/TableMenu/TableMenu'
import useInitialData from '../../hooks/useInitialData'
import { useAppSelector } from '../../hooks/redux'

function MainPage() {
  const { username } = useAppSelector((state) => state.auth)
  const { isLoading, error } = useInitialData()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <>
      <Header username={username} />
      <TableHeader />
      <TableContent />
      <TableMenu />
    </>
  )
}

export default MainPage
