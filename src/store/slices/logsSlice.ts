/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { ILogs, LogsResponseDto, PostLogsRequestDto } from '../../api/logs/types/logs.types'
import logsApiInstance from '../../api/logs/logs.api'

export interface LogsState {
  logs: ILogs[]
  isLoading: boolean
  error: string | null
}

const initialLogsState: LogsState = {
  logs: [],
  isLoading: false,
  error: null,
}

export const getLogs = createAsyncThunk<LogsResponseDto[], void, { rejectValue: string }>(
  'logs/get',
  async (_: void, { rejectWithValue }) => {
    try {
      const response = await logsApiInstance.getLogs()
      return response
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch logs')
    }
  },
)

export const addLog = createAsyncThunk<LogsResponseDto, PostLogsRequestDto, { rejectValue: string }>(
  'auth/login',
  async (log: PostLogsRequestDto, { rejectWithValue }) => {
    try {
      const response = await logsApiInstance.addLog(log)
      return response
    } catch (err: any) {
      console.log(err)
      return rejectWithValue(err.message || 'Failed to add log')
    }
  },
)

const logsSlice = createSlice({
  name: 'logs',
  initialState: initialLogsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLogs.pending, (state) => {
        state.error = null
        state.isLoading = true
        state.logs = []
      })
      .addCase(getLogs.rejected, (state, action) => {
        state.error = action.payload as string
        state.logs = []
        state.isLoading = false
      })
      .addCase(getLogs.fulfilled, (state, action) => {
        state.error = null
        state.logs = action.payload
        state.isLoading = false
      })
      .addCase(addLog.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.logs = []
      })
      .addCase(addLog.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.logs = []
      })
      .addCase(addLog.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.logs.shift()
        state.logs.push(action.payload)
      })
  },
})

export default logsSlice.reducer
