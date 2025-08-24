/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface IList {
  id: number
  tableId: number
  name: string
}

export interface ListParamType {
  tableId: number
  listId: number
}

export interface PostListRequestDto extends Pick<IList, 'name'> {}
export interface UpdateListRequestDto extends Pick<IList, 'name'> {}

export interface ListResponseDto extends IList {}
