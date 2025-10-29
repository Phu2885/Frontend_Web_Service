import { Carousel } from 'react-bootstrap'

const AppCarousel = () => {
  return (
    <Carousel className="mb-4">
      <Carousel.Item>
        <div 
          className="carousel-image-placeholder"
          style={{
            height: '400px',
            backgroundColor: '#f8f9fa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div className="text-center">
            <h3>Исследование элементарных частиц</h3>
            <p>Изучайте свойства и поведение различных частиц</p>
          </div>
        </div>
      </Carousel.Item>
      
      <Carousel.Item>
        <div 
          className="carousel-image-placeholder"
          style={{
            height: '400px',
            backgroundColor: '#e9ecef',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div className="text-center">
            <h3>Технология пузырьковой камеры</h3>
            <p>Современные методы визуализации траекторий частиц</p>
          </div>
        </div>
      </Carousel.Item>
      
      <Carousel.Item>
        <div 
          className="carousel-image-placeholder"
          style={{
            height: '400px',
            backgroundColor: '#dee2e6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div className="text-center">
            <h3>Научные расчеты</h3>
            <p>Проводите точные расчеты энергии и траекторий частиц</p>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  )
}

export default AppCarousel