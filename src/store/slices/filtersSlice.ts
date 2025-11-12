// src/store/slices/filtersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FiltersState {
  searchInput: string // то что вводим в поле
  appliedTitle: string // то что применяется при нажатии "Найти" (отправляется в API)
}

const initialState: FiltersState = {
  searchInput: '',
  appliedTitle: '',
}

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload
    },
    applySearch: (state) => {
      state.appliedTitle = state.searchInput // применяем поиск только при нажатии кнопки
    },
    resetFilters: (state) => {
      state.searchInput = ''
      state.appliedTitle = ''
    }
  }
})

export const {
  setSearchInput,
  applySearch,
  resetFilters
} = filtersSlice.actions

export default filtersSlice.reducer