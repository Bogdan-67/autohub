import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IGood } from '../../models/IGood';
import { Status } from '../../models/Status.enum';
import { AxiosResponse } from 'axios';
import GoodService from '../../services/GoodService';
import { message } from 'antd';

interface FetchGoodsProps {
  categoryId: number;
  filters?: { [key: string]: string[] };
}

export const fetchGoods = createAsyncThunk<
  AxiosResponse<IGood[]>,
  FetchGoodsProps,
  { rejectValue: string }
>('goods/fetchGoods', async (params, { rejectWithValue }) => {
  try {
    const { categoryId, filters } = params;
    const response = await GoodService.getGoods(categoryId, filters);
    return response;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data.message);
  }
});

interface GoodState {
  goods: IGood[];
  status: Status;
  error: string | null;
}

const initialState: GoodState = {
  goods: [],
  status: Status.SUCCESS,
  error: null,
};

const goodSlice = createSlice({
  name: 'goodReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Запрос списка категорий
    builder.addCase(fetchGoods.pending, (state, action) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchGoods.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.goods = action.payload.data;
    });
    builder.addCase(fetchGoods.rejected, (state, action) => {
      state.status = Status.ERROR;
      message.error(action.payload);
      state.error = action.payload;
    });
  },
});

export const SelectGoods = (state: RootState) => state.goodReducer.goods;
export const SelectGoodSlice = (state: RootState) => state.goodReducer;
export const {} = goodSlice.actions;

export default goodSlice.reducer;
