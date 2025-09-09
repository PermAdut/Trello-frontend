import { type AxiosInstance } from 'axios'
import type { AuthResponse, LoginCredentials, RegisterCredentials } from './types/auth.types'
import axiosInstance from '../axiosInstance'

class AuthApi {
  private axiosInstance: AxiosInstance
  private url: string = '/auth'
  constructor() {
    this.axiosInstance = axiosInstance
  }
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.axiosInstance.post(`${this.url}/login`, credentials)
    return response.data
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await this.axiosInstance.post(`${this.url}/register`, credentials)
    return response.data
  }

  async refresh(): Promise<AuthResponse> {
    const response = await this.axiosInstance.post(`${this.url}/refresh`)
    return response.data
  }

  async getUsername(): Promise<Pick<AuthResponse, 'username'>> {
    const response = await this.axiosInstance.get(`${this.url}/username`)
    return response.data
  }
}

const authApiInstance = new AuthApi()
export default authApiInstance
