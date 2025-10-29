import Navbar from '../components/Navbar'
import '../styles/HomePage.css'

const HomePage = () => {
  return (
    <div className="home-container">
      <Navbar />
      
      <div className="content-wrapper">
        <div className="welcome-content">
          <h1 className="welcome-title">
            ДОБРО ПОЖАЛОВАТЬ В СЕРВИС ПУЗЫРЬКОВОЙ КАМЕРЫ
          </h1>
          
          <p className="welcome-text">
            Этот сервис предназначен для исследования и визуализации элементарных частиц 
            с использованием технологии пузырьковой камеры. Наша платформа позволяет ученым 
            и исследователям изучать поведение частиц в различных условиях.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomePage