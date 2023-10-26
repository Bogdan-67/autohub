import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AxiosResponse } from 'axios';
import { Status } from '../../models/Status.enum';
import { IReview } from '../../models/IReview';
import ReviewService from '../../services/ReviewService';

interface ReviewState {
  list: IReview[];
  status: string;
  error: string;
}

interface FetchReviewsProps {
  good_id?: number;
  user_id?: number;
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
    if (!error.response) {
      throw error.message;
    }
    return rejectWithValue(error.response.data.message);
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
      state.list = initialState.list;
    });
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.list = action.payload.data;
    });
    builder.addCase(fetchReviews.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.error = action.payload;
    });
  },
});

export const SelectReviewsList = (state: RootState) => state.reviews.list;
export const SelectReviews = (state: RootState) => state.reviews;
export const {} = reviewSlice.actions;

export default reviewSlice.reducer;
