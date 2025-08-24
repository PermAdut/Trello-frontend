/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { ITask, PostTaskRequestDto, TaskResponseDto, UpdateTaskRequestDto } from '../../api/task/types/task.types'
import taskApiInstance from '../../api/task/task.api'

export interface TasksState {
  tasks: ITask[]
  selectedTask: ITask | null
  isLoading: boolean
  error: string | null
}

const initialTasksState: TasksState = {
  tasks: [],
  selectedTask: null,
  isLoading: false,
  error: null,
}

export const getAllTasks = createAsyncThunk<
  TaskResponseDto[],
  { tableId: number; listId: number },
  { rejectValue: string }
>('tasks/getAll', async ({ tableId, listId }, { rejectWithValue }) => {
  try {
    const response = await taskApiInstance.getAllTasks(tableId, listId)
    return response
  } catch (err: any) {
    return rejectWithValue(err.message || 'Failed to fetch tasks')
  }
})

export const getOneTask = createAsyncThunk<
  TaskResponseDto,
  { tableId: number; listId: number; taskId: number },
  { rejectValue: string }
>('tasks/getOne', async ({ tableId, listId, taskId }, { rejectWithValue }) => {
  try {
    const response = await taskApiInstance.getOneTask(tableId, listId, taskId)
    return response
  } catch (err: any) {
    return rejectWithValue(err.message || 'Failed to fetch task')
  }
})

export const addOneTask = createAsyncThunk<
  TaskResponseDto,
  { tableId: number; listId: number; body: PostTaskRequestDto },
  { rejectValue: string }
>('tasks/addOne', async ({ tableId, listId, body }, { rejectWithValue }) => {
  try {
    const response = await taskApiInstance.addOneTask(tableId, listId, body)
    return response
  } catch (err: any) {
    return rejectWithValue(err.message || 'Failed to add task')
  }
})

export const updateTask = createAsyncThunk<
  TaskResponseDto,
  { tableId: number; listId: number; taskId: number; body: UpdateTaskRequestDto },
  { rejectValue: string }
>('tasks/update', async ({ tableId, listId, taskId, body }, { rejectWithValue }) => {
  try {
    const response = await taskApiInstance.updateTask(tableId, listId, taskId, body)
    return response
  } catch (err: any) {
    return rejectWithValue(err.message || 'Failed to update task')
  }
})

export const deleteTask = createAsyncThunk<
  void,
  { tableId: number; listId: number; taskId: number },
  { rejectValue: string }
>('tasks/delete', async ({ tableId, listId, taskId }, { rejectWithValue }) => {
  try {
    await taskApiInstance.deleteTask(tableId, listId, taskId)
  } catch (err: any) {
    return rejectWithValue(err.message || 'Failed to delete task')
  }
})

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialTasksState,
  reducers: {
    clearSelectedTask(state) {
      state.selectedTask = null
    },
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.tasks = []
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.tasks = action.payload
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.tasks = []
      })
      .addCase(getOneTask.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.selectedTask = null
      })
      .addCase(getOneTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.selectedTask = action.payload
      })
      .addCase(getOneTask.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.selectedTask = null
      })
      .addCase(addOneTask.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(addOneTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.tasks.push(action.payload)
      })
      .addCase(addOneTask.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.tasks = state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task))
        if (state.selectedTask?.id === action.payload.id) {
          state.selectedTask = action.payload
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.tasks = state.tasks.filter((task) => task.id !== action.meta.arg.taskId)
        if (state.selectedTask?.id === action.meta.arg.taskId) {
          state.selectedTask = null
        }
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const taskActions = tasksSlice.actions
export default tasksSlice.reducer
