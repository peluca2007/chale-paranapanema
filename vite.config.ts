import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' deixa o build funcionar em qualquer lugar: GitHub Pages (/nome-do-repo/),
// domínio próprio, Vercel, Netlify ou Cloudflare Pages, sem precisar configurar nada.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
