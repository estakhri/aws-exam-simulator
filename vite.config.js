import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages deployment, set base to your repository name
// e.g., '/aws-exam-simulator/' if your repo is username.github.io/aws-exam-simulator
// Or use './' for relative paths that work in any subdirectory
export default defineConfig({
  plugins: [react()],
  base: '/aws-exam-simulator/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})

