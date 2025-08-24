import { type AxiosInstance } from 'axios'
import axiosInstance from '../axiosInstance'
import type { PostTableRequestDto, TableResponseDto, UpdateTableRequestDto } from './types/table.types'

class TableApi {
  private axiosInstance: AxiosInstance
  private url = 'table'
  constructor() {
    this.axiosInstance = axiosInstance
  }
  async getAllTables(): Promise<TableResponseDto[]> {
    const response = await this.axiosInstance.get(`${this.url}`)
    return response.data
  }

  async getOneTable(tableId: number): Promise<TableResponseDto> {
    const response = await this.axiosInstance.get(`${this.url}${tableId}`)
    return response.data
  }

  async addOneTable(body: PostTableRequestDto): Promise<TableResponseDto> {
    const response = await this.axiosInstance.post(`${this.url}`, body)
    return response.data
  }

  async updateTable(tableId: number, body: UpdateTableRequestDto): Promise<TableResponseDto> {
    const response = await this.axiosInstance.patch(`${this.url}${tableId}`, body)
    return response.data
  }

  async deleteTable(tableId: number): Promise<void> {
    const response = await this.axiosInstance.delete(`${this.url}${tableId}`)
    return response.data
  }
}

const tableApiInstance = new TableApi()
export default tableApiInstance
