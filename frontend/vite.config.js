import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api/':"http://localhost:30000",
      '/uploads/':"http://localhost:30000",
    }
  }
})
