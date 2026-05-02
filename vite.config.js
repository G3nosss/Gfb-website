import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Gfb-website/',
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.gltf'],
})
