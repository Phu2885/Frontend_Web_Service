import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ParticlesPage from './pages/ParticlesPage'
import ParticleDetailPage from './pages/ParticleDetailPage'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/particles" element={<ParticlesPage />} />
        <Route path="/particles/:id" element={<ParticleDetailPage />} />
      </Routes>
    </div>
  )
}

export default App