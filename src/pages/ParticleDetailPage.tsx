import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Particle } from '../types'
import { fetchParticleById } from '../api/particlesApi' // УБРАЛИ addToCalculation
import Navbar from '../components/Navbar'
import Breadcrumbs from '../components/Breadcrumbs'
import '../styles/ParticleDetailPage.css'

const ParticleDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const [particle, setParticle] = useState<Particle | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      loadParticle(parseInt(id))
    }
  }, [id])

  const loadParticle = async (particleId: number) => {
    try {
      setLoading(true)
      const data = await fetchParticleById(particleId)
      setParticle(data)
    } catch (err) {
      console.error('Error loading particle:', err)
    } finally {
      setLoading(false)
    }
  }

  // УБРАЛИ функцию handleAddToCalculation

  if (loading) {
    return (
      <div className="detail-container">
        <Navbar />
        <div className="particle-details">
          <div style={{textAlign: 'center'}}>Загрузка...</div>
        </div>
      </div>
    )
  }

  if (!particle) {
    return (
      <div className="detail-container">
        <Navbar />
        <div className="particle-details">
          <div style={{textAlign: 'center', color: 'red'}}>Частица не найдена</div>
        </div>
      </div>
    )
  }

  const imageUrl = particle.image 
    ? `${import.meta.env.BASE_URL || ''}assets/images/${particle.image}`
    : `${import.meta.env.BASE_URL || ''}assets/images/default-particle.png`

  return (
    <div className="detail-container">
      <Navbar />
      
      <div className="particle-details">
        {/* BREADCRUMBS ВНУТРИ КАРТОЧКИ В ПРАВОМ УГЛУ */}
        <div className="breadcrumbs-container">
          <Breadcrumbs crumbs={[
            { label: 'Каталог частиц', path: '/particles' },
            { label: particle.title }
          ]} />
        </div>
        
        <h2>Детали частицы: {particle.title}</h2>
        
        <div className="details-content">
          <div className="info">
            <h3>Название и классификация:</h3>
            <ul className="details-list">
              <li>{particle.title}</li>
              <li>Семейство: {particle.family}</li>
            </ul>

            <h3>Физические свойства:</h3>
            <ul className="details-list">
              <li>Заряд: {particle.charge} e</li>
              <li>Масса покоя: {particle.mass}</li>
              <li>Спин: {particle.spin}</li>
              <li>Время жизни: {particle.lifetime}</li>
              <li>Кварковый состав: {particle.composition}</li>
            </ul>

            {/* УБРАЛИ кнопку "Добавить в расчет энергии" */}
          </div>

          <div className="particle-image">
            <img 
              src={imageUrl} 
              alt={particle.title}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = '/assets/images/default-particle.png'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParticleDetailPage