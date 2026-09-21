import { defineConfig } from 'vite';
export default defineConfig({
  base: '/equaquest/',
  server: { proxy: { '/api': 'http://localhost:3000' } }
});
