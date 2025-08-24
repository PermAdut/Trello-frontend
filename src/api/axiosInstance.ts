/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios'
import authApiInstance from './auth/auth.api'

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api/v1.0`,
  withCredentials: true,
})
axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: any) => {
    if (error instanceof AxiosError && error.response?.status === 401) {
      const axiosErr = error as AxiosError & {
        config: any
      }
      const originalRequest = axiosErr.config
      console.log(axiosErr)
      if (originalRequest && originalRequest._retry) {
        originalRequest._retry = false
        try {
          const response = await authApiInstance.refresh()
          localStorage.setItem('accessToken', response.accessToken)
          originalRequest.headers.Authorization = `Bearer ${response.accessToken}`
          return axiosInstance(originalRequest)
        } catch (err) {
          window.location.href = '/login'
          return Promise.reject(err)
        }
      }
      return Promise.reject(error)
    } else throw Error(error.response.data.error || '')
  },
)
export default axiosInstance
