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

// УБИРАЕМ items полностью, так как оно не используется
export interface Calculation {
  count: number
  total: number
}

export interface Filters {
  title?: string
  mass?: string
  charge?: string
  family?: string
}