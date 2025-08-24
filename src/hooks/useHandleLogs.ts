import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './redux'
import type { ILogs } from '../api/logs/types/logs.types'
import { getLogs } from '../store/slices/logsSlice'

export function useHandleLogs(): [ILogs[], boolean, string | null] {
  const { logs, isLoading, error } = useAppSelector((state) => state.logs)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getLogs())
  }, [dispatch, logs])

  return [logs, isLoading, error]
}
