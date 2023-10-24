import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import filters from './slices/filterSlice';
import auth from './slices/authSlice';
import categories from './slices/categoriesSlice';
import goodReducer from './slices/goodSlice';
import brands from './slices/brandsSlice';

export const store = configureStore({
  reducer: {
    filters,
    auth,
    categories,
    brands,
    goodReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
