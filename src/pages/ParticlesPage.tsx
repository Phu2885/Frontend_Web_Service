import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Particle } from '../types'
import { fetchParticles, addToCalculation, fetchCalculation } from '../api/particlesApi'
import Navbar from '../components/Navbar'
import ParticleCard from '../components/ParticleCard'
import '../styles/ParticlesPage.css'

const ParticlesPage = () => {
  const [particles, setParticles] = useState<Particle[]>([])
  const [filteredParticles, setFilteredParticles] = useState<Particle[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [calculation, setCalculation] = useState({ count: 0, total: 0 })

  useEffect(() => {
    loadParticles()
    loadCalculation()
  }, [])

  useEffect(() => {
    setFilteredParticles(particles)
  }, [particles])

  const loadParticles = async () => {
    try {
      setLoading(true)
      const data = await fetchParticles({ title: searchTerm })
      setParticles(data)
      setFilteredParticles(data)
    } catch (err) {
      console.error('Error loading particles:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadCalculation = async () => {
    try {
      const data = await fetchCalculation()
      setCalculation(data)
    } catch (err) {
      console.error('Error loading calculation:', err)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    loadParticles()
  }

  const handleAddToCalculation = async (particleId: number) => {
    try {
      await addToCalculation(particleId)
      // Обновляем корзину после добавления
      await loadCalculation()
      alert('Частица добавлена в заявку на расчет')
    } catch (err) {
      alert('Ошибка при добавлении в заявку')
      console.error('Error adding to calculation:', err)
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
      
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            name="particleSearch" 
            placeholder="Поиск по названию или семейству..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '400px', padding: '8px' }}
          />
          <button type="submit">Найти</button>
        </form>
      </div>

      <h2 className="catalog-title">Каталог частиц</h2>
      <p className="catalog-subtitle">
        Исследуйте отклонение заряженных частиц в магнитном поле пузырьковой камеры
      </p>

      {filteredParticles.length === 0 && !loading && searchTerm && (
        <div style={{color: 'white', textAlign: 'center', padding: '20px'}}>
          Частицы не найдены. Попробуйте изменить параметры поиска.
        </div>
      )}

      <div className="particles-grid">
        {filteredParticles.map(particle => (
          <ParticleCard 
            key={particle.id}
            particle={particle} 
            onAddToCalculation={handleAddToCalculation}
          />
        ))}
      </div>

      <Link to="/calculations" className="calculator-icon">
        <img src="/assets/images/calculator.png" alt="Калькулятор" />
        {/* Показываем счетчик только если count > 0 */}
        {calculation.count > 0 && (
          <span className="cart-notification">{calculation.count}</span>
        )}
      </Link>
    </div>
  )
}

export default ParticlesPage