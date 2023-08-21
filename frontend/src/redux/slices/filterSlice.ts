import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface FilterState {
  category: number;
  brands: number[];
}

const initialState: FilterState = {
  category: null,
  brands: [],
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<number>) {
      state.category = action.payload;
    },
    addBrand(state, action: PayloadAction<number>) {
      state.brands.push(action.payload);
    },
    removeBrand(state, action: PayloadAction<number>) {
      const index = state.brands.indexOf(action.payload);
      state.brands.splice(index, 1);
    },
    clearBrands(state) {
      state.brands = initialState.brands;
    },
    clearCategory(state) {
      state.category = initialState.category;
    },
    clearFilter(state) {
      state.category = initialState.category;
      state.brands = initialState.brands;
    },
  },
});

export const SelectCategory = (state: RootState) => state.filters.category;
export const SelectBrands = (state: RootState) => state.filters.brands;
export const { setCategory, clearCategory, addBrand, removeBrand, clearBrands, clearFilter } =
  filterSlice.actions;

export default filterSlice.reducer;
