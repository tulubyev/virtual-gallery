import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: 'src/frontend',
  base: '/',
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env': JSON.stringify({}),
    'process.browser': JSON.stringify(true),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/frontend'),
    },
  },
  build: {
    outDir: '../../dist/frontend',
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, 'src/frontend/main.tsx'),
      name: 'VirtualGalleryReact',
      formats: ['iife'],
      fileName: () => 'react-widgets.js',
    },
    rollupOptions: {
      output: {
        assetFileNames: 'react-widgets.[ext]',
        globals: {},
      },
    },
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
  },
});
