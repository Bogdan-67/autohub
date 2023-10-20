import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyEnum {
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

type SortType = {
  name: string;
  sortProperty: SortPropertyEnum;
};

interface FilterState {
  category: number;
  brands: number[];
  prices: {
    min: number;
    max: number;
  };
  features: number[];
  sort: SortType;
  view: string;
}

const initialState: FilterState = {
  category: null,
  brands: [],
  prices: {
    min: 0,
    max: 1000,
  },
  features: [],
  sort: {
    name: 'по алфавиту (А-Я)',
    sortProperty: SortPropertyEnum.TITLE_ASC,
  },
  view: 'cards',
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
    setSort(state, action: PayloadAction<SortType>) {
      state.sort = action.payload;
    },
    setView(state, action: PayloadAction<string>) {
      state.view = action.payload;
    },
  },
});

export const SelectFilters = (state: RootState) => state.filters;
export const SelectSort = (state: RootState) => state.filters.sort;
export const SelectView = (state: RootState) => state.filters.view;
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
  setSort,
  setView,
} = filterSlice.actions;

export default filterSlice.reducer;
