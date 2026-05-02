import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Gfb-website/',
  plugins: [react()],
  base: '/Gfb-website/',
  assetsInclude: ['**/*.glb', '**/*.gltf'],
})
