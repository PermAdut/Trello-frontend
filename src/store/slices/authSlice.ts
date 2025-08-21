/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AuthResponse, LoginCredentials, RegisterCredentials } from '../../api/auth/types/auth.types'
import authApiInstance from '../../api/auth/auth.api'

export interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

const initialAuthState: AuthState = {
  isAuthenticated: !!localStorage.getItem('accessToken'),
  isLoading: false,
  error: null,
}

export const registerUser = createAsyncThunk<AuthResponse, RegisterCredentials, { rejectValue: string }>(
  'auth/register',
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await authApiInstance.register(credentials)
      localStorage.setItem('accessToken', response.accessToken)
      return response
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to register')
    }
  },
)

export const loginUser = createAsyncThunk<AuthResponse, LoginCredentials, { rejectValue: string }>(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authApiInstance.login(credentials)
      localStorage.setItem('accessToken', response.accessToken)
      return response
    } catch (err: any) {
      console.log(err)
      return rejectWithValue(err.message || 'Failed to login')
    }
  },
)

export const refresh = createAsyncThunk<AuthResponse, null, { rejectValue: string }>(
  'auth/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApiInstance.refresh()
      localStorage.setItem('accessToken', response.accessToken)
      return response
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to login')
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    сlearErrors: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state) => {
        state.error = null
        state.isLoading = false
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string
        state.isLoading = false
        state.isAuthenticated = false
      })
      .addCase(loginUser.pending, (state) => {
        state.error = null
        state.isLoading = true
        state.isAuthenticated = false
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.error = null
        state.isLoading = false
        state.isAuthenticated = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string
        state.isLoading = false
        state.isAuthenticated = false
      })
      .addCase(registerUser.pending, (state) => {
        state.error = null
        state.isLoading = true
        state.isAuthenticated = false
      })
      .addCase(refresh.fulfilled, (state) => {
        state.error = null
        state.isLoading = false
        state.isAuthenticated = true
      })
      .addCase(refresh.rejected, (state, action) => {
        state.error = action.payload as string
        state.isLoading = false
        state.isAuthenticated = false
      })
      .addCase(refresh.pending, (state) => {
        state.error = null
        state.isLoading = true
        state.isAuthenticated = false
      })
  },
})

export const authActions = authSlice.actions

export default authSlice.reducer
