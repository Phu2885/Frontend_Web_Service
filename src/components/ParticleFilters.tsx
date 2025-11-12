// src/components/ParticleFilters.tsx
import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import {
  setSearchInput,
  applySearch,
  resetFilters
} from '../store/slices/filtersSlice'

const ParticleFilters: React.FC = () => {
  const dispatch = useAppDispatch()
  const filters = useAppSelector((state) => state.filters)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(applySearch()) // только при нажатии "Найти" применяем поиск
  }

  const handleClear = () => {
    dispatch(resetFilters())
  }

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Поиск по названию или семейству..." 
          value={filters.searchInput}
          onChange={(e) => dispatch(setSearchInput(e.target.value))}
          style={{ width: '400px', padding: '8px' }}
        />
        <button type="submit">Найти</button>
        {filters.appliedTitle && (
          <button type="button" onClick={handleClear} style={{marginLeft: '5px'}}>
            Очистить
          </button>
        )}
      </form>
    </div>
  )
}

export default ParticleFilters