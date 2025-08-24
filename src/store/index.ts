import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import logsReducer from './slices/logsSlice'
import tableReducer from './slices/tableSlice'
import listReducer from './slices/listSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    logs: logsReducer,
    table: tableReducer,
    list: listReducer,
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
