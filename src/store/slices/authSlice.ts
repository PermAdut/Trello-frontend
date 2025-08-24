/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AuthResponse, LoginCredentials, RegisterCredentials } from '../../api/auth/types/auth.types'
import authApiInstance from '../../api/auth/auth.api'

export interface AuthState {
  username: string | null
  isLoading: boolean
  error: string | null
}

const initialAuthState: AuthState = {
  username: null,
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

export const getUsername = createAsyncThunk<Pick<AuthResponse, 'username'>, void, { rejectValue: string }>(
  'auth/username',
  async (_: void, { rejectWithValue }) => {
    try {
      const response = await authApiInstance.getUsername()
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
      .addCase(loginUser.fulfilled, (state, action) => {
        state.error = null
        state.isLoading = false
        state.username = action.payload.username
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string
        state.isLoading = false
        state.username = null
      })
      .addCase(loginUser.pending, (state) => {
        state.error = null
        state.isLoading = true
        state.username = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.error = null
        state.isLoading = false
        state.username = action.payload.username
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string
        state.isLoading = false
        state.username = null
      })
      .addCase(registerUser.pending, (state) => {
        state.error = null
        state.isLoading = true
        state.username = null
      })
      .addCase(getUsername.fulfilled, (state, action) => {
        state.error = null
        state.isLoading = false
        state.username = action.payload.username
      })
      .addCase(getUsername.pending, (state) => {
        state.error = null
        state.isLoading = true
        state.username = null
      })
      .addCase(getUsername.rejected, (state, action) => {
        state.error = action.payload as string
        state.isLoading = false
        state.username = null
      })
  },
})

export const authActions = authSlice.actions

export default authSlice.reducer
