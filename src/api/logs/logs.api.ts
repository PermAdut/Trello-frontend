import { type AxiosInstance } from 'axios'
import axiosInstance from '../axiosInstance'
import type { LogsResponseDto, PostLogsRequestDto } from './types/logs.types'

class LogsApi {
  private axiosInstance: AxiosInstance
  private url = 'logs'
  constructor() {
    this.axiosInstance = axiosInstance
  }
  async getLogs(): Promise<LogsResponseDto[]> {
    const response = await this.axiosInstance.get(`${this.url}`)
    return response.data
  }

  async addLog(log: PostLogsRequestDto): Promise<LogsResponseDto> {
    const response = await this.axiosInstance.post(`${this.url}`, log)
    return response.data
  }
}

const logsApiInstance = new LogsApi()
export default logsApiInstance
