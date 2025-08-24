import { type AxiosInstance } from 'axios'
import axiosInstance from '../axiosInstance'
import type { PostTaskRequestDto, TaskResponseDto, UpdateTaskRequestDto } from './types/task.types'

class TaskApi {
  private axiosInstance: AxiosInstance
  private url = 'task'

  constructor() {
    this.axiosInstance = axiosInstance
  }

  async getAllTasks(tableId: number, listId: number): Promise<TaskResponseDto[]> {
    const response = await this.axiosInstance.get(`/${this.url}/${tableId}/${listId}`)
    return response.data
  }

  async getOneTask(tableId: number, listId: number, taskId: number): Promise<TaskResponseDto> {
    const response = await this.axiosInstance.get(`/${this.url}/${tableId}/${listId}/${taskId}`)
    return response.data
  }

  async addOneTask(tableId: number, listId: number, body: PostTaskRequestDto): Promise<TaskResponseDto> {
    const response = await this.axiosInstance.post(`/${this.url}/${tableId}/${listId}`, body)
    return response.data
  }

  async updateTask(
    tableId: number,
    listId: number,
    taskId: number,
    body: UpdateTaskRequestDto,
  ): Promise<TaskResponseDto> {
    const response = await this.axiosInstance.patch(`/${this.url}/${tableId}/${listId}/${taskId}`, body)
    return response.data
  }

  async deleteTask(tableId: number, listId: number, taskId: number): Promise<void> {
    await this.axiosInstance.delete(`/${this.url}/${tableId}/${listId}/${taskId}`)
  }
}

const taskApiInstance = new TaskApi()
export default taskApiInstance
