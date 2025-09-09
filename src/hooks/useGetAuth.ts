import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from './redux'
import { useEffect } from 'react'
import { authActions, getUsername } from '../store/slices/authSlice'

export default function useGetAuth(): string | null {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { username, error } = useAppSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getUsername())
  }, [])

  useEffect(() => {
    if (username) navigate('/')
  }, [username, navigate])

  useEffect(() => {
    dispatch(authActions.сlearErrors())
    return () => {
      dispatch(authActions.сlearErrors())
    }
  }, [dispatch])
  return error
}
