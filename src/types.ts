// src/types.ts
export interface Particle {
  id: number
  title: string
  charge: string
  mass: string
  family: string
  image?: string
  spin?: string
  lifetime?: string
  composition?: string
  description?: string
}

export interface Calculation {
  count: number
  total: number
}

export interface Filters {
  title?: string // параметр для API
}

export interface FiltersState {
  searchInput: string
  appliedTitle: string
}