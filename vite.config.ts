import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ command }) => {
  
  // Определяем base в зависимости от среды
  const isTauri = process.env.TAURI_ENV === 'true'
  const base = command === 'build' && !isTauri
    ? '/Frontend_Web_Service/'  // Только для GitHub Pages
    : './'                      // Для Tauri и dev

  return {
    base: base,
    plugins: [
      react(),
      mkcert(),
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true,
        },
        manifest: {
          name: "ПУЗЫРЬКОВАЯ КАМЕРА - Исследование частиц",
          short_name: "Пузырьковая Камера",
          description: "Приложение для исследования элементарных частиц",
          start_url: base,
          display: "standalone",
          background_color: "#1a1a1a",
          theme_color: "#000000",
          orientation: "portrait-primary",
          icons: [
            {
              src: "assets/images/icon-192.png",
              sizes: "192x192",
              type: "image/png"
            },
            {
              src: "assets/images/icon-512.png",
              sizes: "512x512", 
              type: "image/png"
            }
          ]
        }
      })
    ],
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://172.20.10.10:8080',
          changeOrigin: true,
        },
        '/img': {
          target: 'http://172.20.10.10:9000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/img/, ''),
        }
      },
    },
    // Clear screen false для лучшей совместимости с Tauri
    clearScreen: false,
  }
})