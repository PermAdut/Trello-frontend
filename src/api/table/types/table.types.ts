/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface ITable {
  id: number
  userId: number
  name: string
}

export interface PostTableRequestDto extends Pick<ITable, 'name'> {}
export interface UpdateTableRequestDto extends Pick<ITable, 'name'> {}

export interface TableResponseDto extends ITable {}
