import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Nom EXACT du dépôt GitHub (sensible à la casse)
  base: '/Chez-nous/',
  plugins: [react()],
})
