import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      scss: path.resolve(__dirname, 'src/scss'),
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    open: true,
    port: 3000
  }
});
