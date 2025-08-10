import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxying API requests to the backend server
      '/api': {
        target: 'http://localhost:8080/oscar', // Target backend URL
        changeOrigin: true, // Needed for virtual hosted sites
        secure: false, // If you're using a self-signed certificate
        rewrite: (path) => path.replace(/^\/api/, '/api'), // Optional: rewrite path
      },
    },
  },
})
