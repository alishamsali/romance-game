import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/romance-game/',
  server: {
    port: 5173,
    open: true,
    hmr: {
      protocol: 'http',
      host: 'localhost',
      port: 5173
    }
  }
})