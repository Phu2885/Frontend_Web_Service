import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global.css'

// PWA регистрация
import { registerSW } from 'virtual:pwa-register'

if ('serviceWorker' in navigator) {
  registerSW()
}

// Определяем базовый путь для Router
const getBasename = () => {
  const isTauri = typeof window !== 'undefined' && (window as any).__TAURI__ !== undefined
  return isTauri ? '' : (import.meta.env.BASE_URL || '')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={getBasename()}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)