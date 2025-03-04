import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server:{
    allowedHosts: ["ngrok-free.app"],
    host: true, // Allow external access
    port: 5173,
    proxy:{
      '/api':'http://localhost:3000',
    },
  },
  plugins: [
    tailwindcss(),
    react(),
  ],
})
