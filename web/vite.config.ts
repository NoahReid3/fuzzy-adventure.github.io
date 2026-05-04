import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// GitHub Pages project URL: https://<user>.github.io/fuzzy-adventure/
export default defineConfig({
  base: '/fuzzy-adventure/',
  plugins: [react()],
})
