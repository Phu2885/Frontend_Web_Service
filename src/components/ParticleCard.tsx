import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Particle } from '../types'
import { getImageUrl } from '../api/particlesApi'

interface ParticleCardProps {
  particle: Particle
  // УБИРАЕМ onAddToCalculation
}

const ParticleCard = ({ particle }: ParticleCardProps) => {
  // СИНХРОННО вычисляем URL как в старом коде
  const imageUrl = getImageUrl(particle.image)

  return (
    <Card className="h-100 particle-card" style={{ width: '309px', minHeight: '400px' }}>
      <div className="text-center pt-3">
        <Card.Img 
          variant="top" 
          src={imageUrl}
          style={{ 
            height: '200px', 
            width: '200px',
            objectFit: 'contain'
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = '/assets/images/default-particle.png'
          }}
        />
      </div>
      
      <Card.Body className="d-flex flex-column">
        <Card.Title 
          className="text-center mb-3" 
          style={{ 
            minHeight: '40px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 'bold'
          }}
        >
          {particle.title}
        </Card.Title>
        
        <div className="particle-properties flex-grow-1 d-flex flex-column justify-content-center mb-3">
          <Card.Text className="mb-2" style={{ fontSize: '14px', color: '#666' }}>
            <strong>Заряд:</strong> {particle.charge}
          </Card.Text>
          <Card.Text className="mb-2" style={{ fontSize: '14px', color: '#666' }}>
            <strong>Масса:</strong> {particle.mass}
          </Card.Text>
          <Card.Text className="mb-2" style={{ fontSize: '14px', color: '#666' }}>
            <strong>Семейство:</strong> {particle.family}
          </Card.Text>
        </div>
        
        <div className="mt-auto">
          <Link to={`/particles/${particle.id}`} className="d-block text-decoration-none">
            <Button 
              variant="dark" 
              className="w-100"
              style={{ 
                height: '35px',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            >
              Подробнее
            </Button>
          </Link>
          {/* УБИРАЕМ кнопку "Добавить в расчет" */}
        </div>
      </Card.Body>
    </Card>
  )
}

export default ParticleCard