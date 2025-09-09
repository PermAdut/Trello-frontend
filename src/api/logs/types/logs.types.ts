/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface ILogs {
  id: number
  userId: number
  log: string
  timestamp: Date
}

export interface PostLogsRequestDto extends Pick<ILogs, 'log'> {}

export interface LogsResponseDto extends ILogs {}
