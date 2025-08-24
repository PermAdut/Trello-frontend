import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { getAllTables } from '../store/slices/tableSlice'
import { getLogs } from '../store/slices/logsSlice'
import { getUsername } from '../store/slices/authSlice'

interface InitialDataState {
  isLoading: boolean
  error: string | null
}

export default function useInitialData(): InitialDataState {
  const dispatch = useAppDispatch()
  const { isLoading: tablesLoading, error: tablesError } = useAppSelector((state) => state.table)
  const { isLoading: logsLoading, error: logsError } = useAppSelector((state) => state.logs)
  const { isLoading: authLoading, error: authError } = useAppSelector((state) => state.auth)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsInitialLoading(true)
      setError(null)

      try {
        await Promise.all([
          dispatch(getAllTables()).unwrap(),
          dispatch(getLogs()).unwrap(),
          dispatch(getUsername()).unwrap(),
        ])
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || 'Failed to fetch initial data')
      } finally {
        setIsInitialLoading(false)
      }
    }

    fetchInitialData()
  }, [dispatch])

  const isLoading = isInitialLoading || tablesLoading || logsLoading || authLoading
  const combinedError = error || tablesError || logsError || authError

  return { isLoading, error: combinedError }
}
