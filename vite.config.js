import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        'product-list': 'product-list.html',
        'product-detail': 'product-detail.html',
        'contact': 'contact.html',
        'about': 'about.html',
        'services': 'services.html'
      }
    },
    // Copy sections folder to dist
    copyPublicDir: true
  },
  // Ensure assets are correctly referenced
  base: './',
  // Include sections folder in public assets
  publicDir: 'public'
})