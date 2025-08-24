import { useEffect, useRef } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { useNavigate } from 'react-router-dom'
import { getUsername } from '../store/slices/authSlice'

export default function useGetUserName(): [string | null, boolean, string | null] {
  const { username, isLoading, error } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const timerId = useRef<null | ReturnType<typeof setTimeout>>(null)
  useEffect(() => {
    const handleDispatch = async () => {
      if (!username && !isLoading) {
        const result = await dispatch(getUsername())
        if (getUsername.rejected.match(result) || (!username && !isLoading)) {
          timerId.current = setTimeout(() => {
            navigate('/login')
          }, 5000)
        } else {
          if (timerId.current) clearTimeout(timerId.current)
        }
      }
    }

    handleDispatch()
  }, [])

  return [username, isLoading, error]
}
