import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// Конфиг для GitHub Pages - с PWA но без HTTPS
export default defineConfig({
  base: '/Frontend_Web_Service/', // Важно для GitHub Pages
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false,
      },
      manifest: {
        name: "ПУЗЫРЬКОВАЯ КАМЕРА - Исследование частиц",
        short_name: "Пузырьковая Камера",
        description: "Приложение для исследования элементарных частиц",
        start_url: '/Frontend_Web_Service/',
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
    host: true,
    strictPort: true,
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
  clearScreen: false,
})