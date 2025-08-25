/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type {
  ITable,
  PostTableRequestDto,
  TableResponseDto,
  UpdateTableRequestDto,
} from '../../api/table/types/table.types'
import tableApiInstance from '../../api/table/table.api'

export interface TablesState {
  tables: ITable[]
  selectedTable: ITable | null
  isLoading: boolean
  error: string | null
}

const initialTablesState: TablesState = {
  tables: [],
  selectedTable: null,
  isLoading: false,
  error: null,
}

export const getAllTables = createAsyncThunk<TableResponseDto[], void, { rejectValue: string }>(
  'tables/getAll',
  async (_: void, { rejectWithValue }) => {
    try {
      const response = await tableApiInstance.getAllTables()
      return response
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch tables')
    }
  },
)

export const getOneTable = createAsyncThunk<TableResponseDto, number, { rejectValue: string }>(
  'tables/getOne',
  async (tableId: number, { rejectWithValue }) => {
    try {
      const response = await tableApiInstance.getOneTable(tableId)
      return response
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch table')
    }
  },
)

export const addOneTable = createAsyncThunk<TableResponseDto, PostTableRequestDto, { rejectValue: string }>(
  'tables/addOne',
  async (body: PostTableRequestDto, { rejectWithValue }) => {
    try {
      const response = await tableApiInstance.addOneTable(body)
      return response
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to add table')
    }
  },
)

export const updateTable = createAsyncThunk<
  TableResponseDto,
  { tableId: number; body: UpdateTableRequestDto },
  { rejectValue: string }
>('tables/update', async ({ tableId, body }, { rejectWithValue }) => {
  try {
    const response = await tableApiInstance.updateTable(tableId, body)
    return response
  } catch (err: any) {
    return rejectWithValue(err.message || 'Failed to update table')
  }
})

export const deleteTable = createAsyncThunk<void, number, { rejectValue: string }>(
  'tables/delete',
  async (tableId: number, { rejectWithValue }) => {
    try {
      await tableApiInstance.deleteTable(tableId)
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to delete table')
    }
  },
)

const tablesSlice = createSlice({
  name: 'tables',
  initialState: initialTablesState,
  reducers: {
    clearSelectedTable(state) {
      state.selectedTable = null
    },
    clearError(state) {
      state.error = null
    },
    clearTableData(state) {
      state.error = null
      state.isLoading = false
      state.selectedTable = null
      state.tables = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTables.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.tables = []
      })
      .addCase(getAllTables.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.tables = action.payload.sort((a, b) => a.id - b.id)
      })
      .addCase(getAllTables.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.tables = []
      })
      .addCase(getOneTable.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getOneTable.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.selectedTable = action.payload
      })
      .addCase(getOneTable.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.selectedTable = null
      })
      .addCase(addOneTable.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.tables.push(action.payload)
        if (state.selectedTable === null) {
          state.selectedTable = action.payload
        }
      })
      .addCase(addOneTable.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(updateTable.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.tables = state.tables.map((table) => (table.id === action.payload.id ? action.payload : table))
        if (state.selectedTable?.id === action.payload.id) {
          state.selectedTable = action.payload
        }
      })
      .addCase(updateTable.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(deleteTable.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteTable.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.tables = state.tables.filter((table) => table.id !== action.meta.arg)
        if (state.selectedTable?.id === action.meta.arg) {
          state.selectedTable = null
        }
      })
      .addCase(deleteTable.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const tableActions = tablesSlice.actions
export default tablesSlice.reducer
