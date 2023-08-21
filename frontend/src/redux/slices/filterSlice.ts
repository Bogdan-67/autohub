import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface FilterState {
  category: number;
  brands: number[];
  prices: {
    min: number;
    max: number;
  };
}

const initialState: FilterState = {
  category: null,
  brands: [],
  prices: {
    min: 0,
    max: 1000,
  },
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
    setMinPrice(state, action: PayloadAction<number>) {
      state.prices.min = action.payload;
    },
    setMaxPrice(state, action: PayloadAction<number>) {
      state.prices.max = action.payload;
    },
    clearPrices(state) {
      state.prices = initialState.prices;
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
      state.prices = initialState.prices;
    },
  },
});

export const SelectPrices = (state: RootState) => state.filters.prices;
export const SelectCategory = (state: RootState) => state.filters.category;
export const SelectBrands = (state: RootState) => state.filters.brands;
export const {
  setCategory,
  clearCategory,
  addBrand,
  removeBrand,
  clearBrands,
  clearFilter,
  setMinPrice,
  setMaxPrice,
  clearPrices,
} = filterSlice.actions;

export default filterSlice.reducer;
