import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/ai-maktab/', // Explicitly match repository name for GH Pages subpath
  plugins: [react()],
})
