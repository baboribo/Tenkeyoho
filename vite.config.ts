import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
    server: {
        https: true
    },
    plugins: [
        tailwindcss(),
        react(),
        basicSsl(),
    ]
})
