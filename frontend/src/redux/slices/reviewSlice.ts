import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AxiosResponse } from 'axios';
import { Status } from '../../models/Status.enum';
import { IReview } from '../../models/IReview';
import ReviewService from '../../services/ReviewService';
import { message } from 'antd';

interface ReviewState {
  list: IReview[];
  status: string;
  error: string;
}

interface FetchReviewsProps {
  good_id?: number;
  user_id?: number;
}

interface CreateReviewProps {
  user_id: number;
  good_id: number;
  rate: number;
  text: string;
}

const initialState: ReviewState = {
  list: [],
  status: Status.SUCCESS,
  error: null,
};

export const fetchReviews = createAsyncThunk<
  AxiosResponse<IReview[]>,
  FetchReviewsProps,
  { rejectValue: string }
>('reviews/get', async (params, { rejectWithValue }) => {
  try {
    const { good_id, user_id } = params;
    const response = await ReviewService.fetchReviews(good_id, user_id);
    return response;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data.message : error.message);
  }
});

export const createReview = createAsyncThunk<
  AxiosResponse<IReview>,
  CreateReviewProps,
  { rejectValue: string }
>('reviews/create', async (params, { rejectWithValue }) => {
  try {
    const { good_id, user_id, text, rate } = params;
    const response = await ReviewService.createReview(good_id, user_id, text, rate);
    return response;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data.message : error.message);
  }
});

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Запрос отзывов
    builder.addCase(fetchReviews.pending, (state, action) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.list = action.payload.data;
    });
    builder.addCase(fetchReviews.rejected, (state, action) => {
      state.status = Status.ERROR;
      message.error(action.payload);
      state.error = action.payload;
    });
    // Создание отзыва
    builder.addCase(createReview.pending, (state, action) => {
      state.status = Status.LOADING;
    });
    builder.addCase(createReview.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      message.success('Отзыв отправлен');
      state.list.push(action.payload.data);
    });
    builder.addCase(createReview.rejected, (state, action) => {
      state.status = Status.ERROR;
      message.error(action.payload);
      state.error = action.payload;
    });
  },
});

export const SelectReviewsList = (state: RootState) => state.reviews.list;
export const SelectReviews = (state: RootState) => state.reviews;
export const {} = reviewSlice.actions;

export default reviewSlice.reducer;
