import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// GitHub Pages project URL must match the repo name slug, e.g.
// https://noahreid3.github.io/fuzzy-adventure.github.io/
export default defineConfig({
  base: '/fuzzy-adventure.github.io/',
  plugins: [react()],
})
