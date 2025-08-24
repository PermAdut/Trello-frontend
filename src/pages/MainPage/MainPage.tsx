import useGetUserName from '../../hooks/useGetUserName'

function MainPage() {
  const [username, isLoading, error] = useGetUserName()
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  return <>Hello {username}</>
}

export default MainPage
