import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        'product-list': 'product-list.html',
        'product-detail': 'product-detail.html',
        'contact': 'contact.html',
        'admin-create': 'admin-create.html',
        'admin-edit': 'admin-edit.html'
      }
    }
  },
  // Ensure assets are correctly referenced
  base: './'
})
