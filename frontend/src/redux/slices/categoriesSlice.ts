import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ICategory } from '../../models/ICategory';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../../models/response/AuthResponse';
import CategoriesService from '../../services/CategoriesService';
import { Status } from '../../models/Status.enum';
import { ErrorResponse } from '../../models/response/ErrorResponse';

interface CategoriesState {
  list: ICategory[];
  status: string;
  error: string;
}

const initialState: CategoriesState = {
  list: [],
  status: Status.SUCCESS,
  error: null,
};

export const fetchCategories = createAsyncThunk<
  AxiosResponse<ICategory[]>,
  void,
  { rejectValue: ErrorResponse }
>('categories/get', async (_, { rejectWithValue }) => {
  try {
    const response = await CategoriesService.getCategories();
    return response;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const createCategory = createAsyncThunk<
  AxiosResponse<ICategory[]>,
  Partial<ICategory>,
  { rejectValue: ErrorResponse }
>('categories/create', async (params, { rejectWithValue }) => {
  try {
    const { name, parent } = params;
    const response = await CategoriesService.createCategory(name, parent);
    return response;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

const filterSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Запрос списка категорий
    builder.addCase(fetchCategories.pending, (state, action) => {
      state.status = Status.LOADING;
      state.list = initialState.list;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.list = action.payload.data;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.error = action.payload.message;
    });
    // Запрос на создание категории
    builder.addCase(createCategory.pending, (state, action) => {
      state.status = Status.LOADING;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.list = action.payload.data;
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.error = action.payload.message;
    });
  },
});

export const SelectCategoriesList = (state: RootState) => state.categories.list;
export const SelectCategories = (state: RootState) => state.categories;
export const {} = filterSlice.actions;

export default filterSlice.reducer;
