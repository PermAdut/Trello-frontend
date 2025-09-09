import { type AxiosInstance } from 'axios'
import axiosInstance from '../axiosInstance'
import type { PostListRequestDto, ListResponseDto, UpdateListRequestDto } from './types/list.types'

class ListApi {
  private axiosInstance: AxiosInstance
  private url = 'list'

  constructor() {
    this.axiosInstance = axiosInstance
  }

  async getAllLists(tableId: number): Promise<ListResponseDto[]> {
    const response = await this.axiosInstance.get(`/${this.url}/${tableId}`)
    return response.data
  }

  async getOneList(tableId: number, listId: number): Promise<ListResponseDto> {
    const response = await this.axiosInstance.get(`/${this.url}/${tableId}/${listId}`)
    return response.data
  }

  async addOneList(tableId: number, body: PostListRequestDto): Promise<ListResponseDto> {
    const response = await this.axiosInstance.post(`/${this.url}/${tableId}`, body)
    return response.data
  }

  async updateList(tableId: number, listId: number, body: UpdateListRequestDto): Promise<ListResponseDto> {
    const response = await this.axiosInstance.patch(`/${this.url}/${tableId}/${listId}`, body)
    return response.data
  }

  async deleteList(tableId: number, listId: number): Promise<void> {
    await this.axiosInstance.delete(`/${this.url}/${tableId}/${listId}`)
  }
}

const listApiInstance = new ListApi()
export default listApiInstance
