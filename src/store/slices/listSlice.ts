/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { IList, PostListRequestDto, ListResponseDto, UpdateListRequestDto } from '../../api/list/types/list.types'
import listApiInstance from '../../api/list/list.api'

export interface ListsState {
  lists: IList[]
  selectedList: IList | null
  isLoading: boolean
  error: string | null
}

const initialListsState: ListsState = {
  lists: [],
  selectedList: null,
  isLoading: false,
  error: null,
}

export const getAllLists = createAsyncThunk<ListResponseDto[], number, { rejectValue: string }>(
  'lists/getAll',
  async (tableId: number, { rejectWithValue }) => {
    try {
      const response = await listApiInstance.getAllLists(tableId)
      return response
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch lists')
    }
  },
)

export const getOneList = createAsyncThunk<
  ListResponseDto,
  { tableId: number; listId: number },
  { rejectValue: string }
>('lists/getOne', async ({ tableId, listId }, { rejectWithValue }) => {
  try {
    const response = await listApiInstance.getOneList(tableId, listId)
    return response
  } catch (err: any) {
    return rejectWithValue(err.message || 'Failed to fetch list')
  }
})

export const addOneList = createAsyncThunk<
  ListResponseDto,
  { tableId: number; body: PostListRequestDto },
  { rejectValue: string }
>('lists/addOne', async ({ tableId, body }, { rejectWithValue }) => {
  try {
    const response = await listApiInstance.addOneList(tableId, body)
    return response
  } catch (err: any) {
    return rejectWithValue(err.message || 'Failed to add list')
  }
})

export const updateList = createAsyncThunk<
  ListResponseDto,
  { tableId: number; listId: number; body: UpdateListRequestDto },
  { rejectValue: string }
>('lists/update', async ({ tableId, listId, body }, { rejectWithValue }) => {
  try {
    const response = await listApiInstance.updateList(tableId, listId, body)
    return response
  } catch (err: any) {
    return rejectWithValue(err.message || 'Failed to update list')
  }
})

export const deleteList = createAsyncThunk<void, { tableId: number; listId: number }, { rejectValue: string }>(
  'lists/delete',
  async ({ tableId, listId }, { rejectWithValue }) => {
    try {
      await listApiInstance.deleteList(tableId, listId)
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to delete list')
    }
  },
)

const listsSlice = createSlice({
  name: 'lists',
  initialState: initialListsState,
  reducers: {
    clearSelectedList(state) {
      state.selectedList = null
    },
    clearError(state) {
      state.error = null
    },
    clearListData(state) {
      state.error = null
      state.isLoading = false
      state.selectedList = null
      state.lists = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLists.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.lists = []
      })
      .addCase(getAllLists.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.lists = action.payload
      })
      .addCase(getAllLists.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.lists = []
      })
      .addCase(getOneList.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.selectedList = null
      })
      .addCase(getOneList.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.selectedList = action.payload
      })
      .addCase(getOneList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.selectedList = null
      })
      .addCase(addOneList.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(addOneList.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.lists.push(action.payload)
      })
      .addCase(addOneList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(updateList.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateList.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.lists = state.lists.map((list) => (list.id === action.payload.id ? action.payload : list))
        if (state.selectedList?.id === action.payload.id) {
          state.selectedList = action.payload
        }
      })
      .addCase(updateList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(deleteList.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.lists = state.lists.filter((list) => list.id !== action.meta.arg.listId)
        if (state.selectedList?.id === action.meta.arg.listId) {
          state.selectedList = null
        }
      })
      .addCase(deleteList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const listActions = listsSlice.actions
export default listsSlice.reducer
