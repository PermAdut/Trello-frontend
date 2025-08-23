import axios, { type AxiosInstance } from 'axios'
import type { AuthResponse, LoginCredentials, RegisterCredentials } from './types/auth.types'

class AuthApi {
  private axiosInstance: AxiosInstance
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${import.meta.env.VITE_SERVER_URL}/api/v1.0/auth`,
      withCredentials: true,
    })
    this.axiosInstance.interceptors.response.use(
      (res) => res,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err: any) => {
        throw Error(err.response.data.error || '')
      },
    )
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.axiosInstance.post('/login', credentials)
    return response.data
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await this.axiosInstance.post('/register', credentials)
    return response.data
  }

  async refresh(): Promise<AuthResponse> {
    const response = await this.axiosInstance.post('/refresh')
    return response.data
  }
}

const authApiInstance = new AuthApi()
export default authApiInstance
