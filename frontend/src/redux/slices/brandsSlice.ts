import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ICategory } from '../../models/ICategory';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../../models/response/AuthResponse';
import CategoriesService from '../../services/CategoriesService';
import { Status } from '../../models/Status.enum';
import { ErrorResponse } from '../../models/response/ErrorResponse';
import { IBrand } from '../../models/IBrand';
import BrandService from '../../services/BrandService';

interface BrandsState {
  list: IBrand[];
  status: string;
  error: string;
}

const initialState: BrandsState = {
  list: [],
  status: Status.SUCCESS,
  error: null,
};

export const fetchBrands = createAsyncThunk<AxiosResponse<IBrand[]>, void, { rejectValue: string }>(
  'brands/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await BrandService.getBrands();
      return response;
    } catch (error) {
      if (!error.response) {
        throw error.message;
      }
      return rejectWithValue(error.response.data.message);
    }
  },
);

const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Запрос списка категорий
    builder.addCase(fetchBrands.pending, (state, action) => {
      state.status = Status.LOADING;
      state.list = initialState.list;
    });
    builder.addCase(fetchBrands.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.list = action.payload.data;
    });
    builder.addCase(fetchBrands.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.error = action.payload;
    });
  },
});

export const SelectBrandsList = (state: RootState) => state.brands.list;
export const SelectBrands = (state: RootState) => state.brands;
export const {} = brandSlice.actions;

export default brandSlice.reducer;
