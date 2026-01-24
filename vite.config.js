import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  // server: {
  //   proxy: {
  //     // proxy all requests starting with /api to your backend
  //     '/api': {
  //       target: 'http://10.0.1.6:8082',
  //       changeOrigin: true,
  //      secure: false,
  //     },
  //   },
  // },
})
