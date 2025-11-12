import { useState, useEffect } from 'react'
import { Particle } from '../types'
import { fetchParticles } from '../api/particlesApi' // УБИРАЕМ addToCalculation, fetchCalculation
import Navbar from '../components/Navbar'
import ParticleCard from '../components/ParticleCard'
import ParticleFilters from '../components/ParticleFilters'
import { useAppSelector } from '../hooks/redux'
import '../styles/ParticlesPage.css'

const ParticlesPage = () => {
  const filters = useAppSelector((state) => state.filters)
  const [particles, setParticles] = useState<Particle[]>([])
  const [loading, setLoading] = useState(true)

  // Загружаем частицы ТОЛЬКО при изменении appliedTitle (после нажатия "Найти")
  useEffect(() => {
    loadParticles()
  }, [filters.appliedTitle])

  const loadParticles = async () => {
    try {
      setLoading(true)
      // Если appliedTitle пустой - получаем ВСЕ частицы
      // Если есть appliedTitle - фильтруем
      const apiFilters = filters.appliedTitle ? { title: filters.appliedTitle } : {}
      const data = await fetchParticles(apiFilters)
      setParticles(data)
    } catch (err) {
      console.error('Error loading particles:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="particles-page">
        <Navbar />
        <div style={{color: 'white', textAlign: 'center', padding: '50px'}}>
          Загрузка частиц...
        </div>
      </div>
    )
  }

  return (
    <div className="particles-page">
      <Navbar />
      
      <ParticleFilters />

      <h2 className="catalog-title">Каталог частиц</h2>
      <p className="catalog-subtitle">
        Исследуйте отклонение заряженных частиц в магнитном поле пузырьковой камеры
      </p>

      {/* Показываем результаты поиска ТОЛЬКО если был применен поиск */}
      {filters.appliedTitle && (
        <div className="search-results-info">
          Результаты поиска по: "{filters.appliedTitle}"
          {particles.length > 0 && ` (найдено: ${particles.length})`}
        </div>
      )}

      {particles.length === 0 && !loading && (
        <div style={{color: 'white', textAlign: 'center', padding: '20px'}}>
          {filters.appliedTitle 
            ? "Частицы не найдены. Попробуйте изменить параметры поиска."
            : "Выберите частицы для отображения."
          }
        </div>
      )}

      <div className="particles-grid">
        {particles.map(particle => (
          <ParticleCard 
            key={particle.id}
            particle={particle} 
            // УБИРАЕМ onAddToCalculation
          />
        ))}
      </div>

      {/* ОСТАВЛЯЕМ calculator-icon для перехода к расчетам */}
    <div className="calculator-icon">
      <img 
        src="/assets/icons/calculator.png" 
        alt="Calculator"
        onClick={() => alert('Калькулятор для расчетов траекторий частиц будет реализован для авторизованных пользователей')}
        style={{ 
          cursor: 'pointer',
          opacity: 0.6 // Полупрозрачный как у друга
        }}
        title="Калькулятор траекторий (в разработке)"
      />
    </div>
    </div>
  )
}

export default ParticlesPage