/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface ITask {
  id: number
  listId: number
  title: string
  description: string | null
  isCompleted: boolean
  orderIndex: number
}

export interface TaskParamType {
  tableId: number
  listId: number
  taskId: number
}

export interface PostTaskRequestDto extends Pick<ITask, 'title' | 'orderIndex'> {}
export interface UpdateTaskRequestDto extends Partial<Omit<ITask, 'id'>> {}
export interface DeleteTaskRequestDto {}

export interface TaskResponseDto extends ITask {}

export interface MoveTaskRequestDto {
  tasks: ITask[]
  movedTask: ITask
  sourceListId: number
}
