import { Particle, Filters } from '../types'
import { dest_api, dest_img } from '../config/environment'

// Mock данные для частиц
const MOCK_PARTICLES: Particle[] = [
  {
    id: 1,
    title: 'Электрон',
    charge: '+1e',
    mass: '0.511 MeV/c²',
    family: 'Лептоны',
    image: 'electron.png',
    spin: '1/2',
    lifetime: 'Стабилен',
    composition: 'Элементарная частица',
    description: 'Фундаментальная частица с отрицательным электрическим зарядом'
  },
  {
    id: 2,
    title: 'Протон',
    charge: '+1e',
    mass: '938.272 MeV/c²',
    family: 'Барионы',
    image: 'proton.png',
    spin: '1/2',
    lifetime: 'Стабилен',
    composition: 'uud',
    description: 'Стабильная положительно заряженная частица в ядре атома'
  },
  {
    id: 3,
    title: 'Альфа-частица',
    charge: '+2e',
    mass: '3727.379 MeV/c²',
    family: 'Ядра',
    image: 'alpha.png',
    spin: '0',
    lifetime: 'Стабилен',
    composition: '2p+2n',
    description: 'Ядро гелия-4, испускаемое при альфа-распаде'
  },
  {
    id: 4,
    title: 'Позитрон',
    charge: '+1e',
    mass: '0.511 MeV/c²',
    family: 'Лептоны',
    image: 'positron.png',
    spin: '1/2',
    lifetime: 'Стабилен',
    composition: 'Античастица электрона',
    description: 'Античастица электрона с положительным зарядом'
  }
]

// Функция для преобразования данных с бекенда
const transformParticleFromBackend = (backendParticle: any): Particle => {
  return {
    id: backendParticle.ID || backendParticle.id,
    title: backendParticle.Title || backendParticle.title,
    charge: backendParticle.Charge || backendParticle.charge,
    mass: backendParticle.Mass || backendParticle.mass,
    family: backendParticle.Family || backendParticle.family,
    image: backendParticle.Image || backendParticle.image,
    spin: backendParticle.Spin || backendParticle.spin,
    lifetime: backendParticle.Lifetime || backendParticle.lifetime,
    composition: backendParticle.Composition || backendParticle.composition,
    description: backendParticle.Description || backendParticle.description
  }
}


// Универсальная функция для всех окружений
export const getImageUrl = (imageName: string | undefined): string => {
  if (!imageName) {
    return `${import.meta.env.BASE_URL || ''}assets/images/default-particle.png`
  }
  
  const isTauri = typeof window !== 'undefined' && (window as any).__TAURI__ !== undefined
  
  if (isTauri) {
    return `${dest_img}/${imageName}`
  } else {
    // Для GitHub Pages используем правильный путь
    return `${import.meta.env.BASE_URL || ''}assets/images/${imageName}`
  }
}
// 
// Получение списка частиц с фильтрацией
export const fetchParticles = async (filters: Filters = {}): Promise<Particle[]> => {
  try {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })

    // Используем dest_api из environment.ts
    const response = await fetch(`${dest_api}/particles?${params}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    // Если бекенд вернул данные, преобразуем их
    if (Array.isArray(data)) {
      return data.map(transformParticleFromBackend)
    } else if (data.data && Array.isArray(data.data)) {
      return data.data.map(transformParticleFromBackend)
    }
    
    return []
    
  } catch (error) {
    console.warn('API недоступен, используем mock-данные', error)
    
    // Фильтрация mock-данных на фронтенде
    let filteredParticles = MOCK_PARTICLES
    
    if (filters.title) {
      filteredParticles = filteredParticles.filter(particle =>
        particle.title.toLowerCase().includes(filters.title!.toLowerCase()) ||
        particle.family.toLowerCase().includes(filters.title!.toLowerCase())
      )
    }
    
    return filteredParticles
  }
}

// Получение деталей частицы по ID
export const fetchParticleById = async (id: number): Promise<Particle> => {
  try {
    // Используем dest_api из environment.ts
    const response = await fetch(`${dest_api}/particles/${id}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    // ПРЕОБРАЗУЕМ ДАННЫЕ С БЕКЕНДА
    if (data.data) {
      return transformParticleFromBackend(data.data)
    }
    
    return transformParticleFromBackend(data)
    
  } catch (error) {
    console.warn('API недоступен, используем mock-данные')
    
    const particle = MOCK_PARTICLES.find(p => p.id === id)
    if (!particle) {
      throw new Error('Частица не найдена')
    }
    
    return particle
  }
}

export const getCalculationBadge = async (): Promise<{count: number}> => {
  // Всегда возвращаем пустую корзину для гостя
  return { count: 0 };
}