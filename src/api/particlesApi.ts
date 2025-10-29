import { Particle, Calculation, Filters } from '../types'

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

// Значения для неавторизованного пользователя (как возвращает бекенд)
const UNAUTHORIZED_CALCULATION: Calculation = {
  count: 0,
  total: -1
}

const API_BASE = '/api'

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

// Функция для получения URL изображения
export const getImageUrl = (imageName: string | undefined): string => {
  if (!imageName) return '/assets/images/default-particle.png'
  
  try {
    // Пытаемся использовать минио (бекенд)
    return `http://127.0.0.1:9000/img/${imageName}`
  } catch {
    // Если бекенд недоступен, используем локальные assets
    return `/assets/images/${imageName}`
  }
}

// Получение списка частиц с фильтрацией
export const fetchParticles = async (filters: Filters = {}): Promise<Particle[]> => {
  try {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })

    const response = await fetch(`${API_BASE}/particles?${params}`)
    
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
    const response = await fetch(`${API_BASE}/particles/${id}`)
    
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

// Добавление частицы в расчет
export const addToCalculation = async (particleId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE}/calculations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ particleId, quantity: 1 }),
    })
    
    if (!response.ok) {
      // Если 401 Unauthorized - пользователь не авторизован
      if (response.status === 401) {
        console.warn('Пользователь не авторизован, нельзя добавить в расчет')
        return
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch (error) {
    console.warn('Не удалось добавить в расчет')
  }
}

// Получение данных корзины
export const fetchCalculation = async (): Promise<Calculation> => {
  try {
    const response = await fetch(`${API_BASE}/calculations`)
    
    if (!response.ok) {
      // Если 401 Unauthorized - пользователь не авторизован
      if (response.status === 401) {
        console.warn('Пользователь не авторизован, возвращаем значения для гостя')
        return UNAUTHORIZED_CALCULATION
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    // Если бекенд вернул данные, используем их
    // Проверяем разные возможные форматы ответа
    if (data.count !== undefined && data.total !== undefined) {
      return data
    } else if (data.data && data.data.count !== undefined && data.data.total !== undefined) {
      return data.data
    }
    
    // Если формат непонятный, возвращаем значения для неавторизованного
    return UNAUTHORIZED_CALCULATION
    
  } catch (error) {
    console.warn('API недоступен, возвращаем значения для неавторизованного пользователя')
    return UNAUTHORIZED_CALCULATION
  }
}