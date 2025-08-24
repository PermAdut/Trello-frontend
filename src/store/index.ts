import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import logsReducer from './slices/logsSlice'
import tableReducer from './slices/tableSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    logs: logsReducer,
    table: tableReducer,
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
