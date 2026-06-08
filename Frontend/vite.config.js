import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/ask-ai': 'http://localhost:8080',
      '/ask-ai-options': 'http://localhost:8080',
      '/generate-image': 'http://localhost:8080',
      '/create-recipe': 'http://localhost:8080',
    }
  }
})