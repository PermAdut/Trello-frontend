import Header from '../../components/Header/Header'
import useGetUserName from '../../hooks/useGetUserName'

function MainPage() {
  const [username, isLoading, error] = useGetUserName()
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  return (
    <>
      <Header username={username} />
    </>
  )
}

export default MainPage
