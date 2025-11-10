import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    allowedHosts: [
      '3000-i5uohcupwjzv8dx08sxgj-dfc00ec5.sandbox.novita.ai',
      '.sandbox.novita.ai'
    ]
  }
})
