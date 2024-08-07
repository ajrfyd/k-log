import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      {
        find: '@pages',
        replacement: path.resolve(__dirname, 'src/pages')
      },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components')
      },
      {
        find: '@shared',
        replacement: path.resolve(__dirname, 'src/components/shared')
      },
      {
        find: '@lib',
        replacement: path.resolve(__dirname, 'src/lib')
      },
      {
        find: '@utils',
        replacement: path.resolve(__dirname, 'src/lib/utils')
      },
      {
        find: '@hooks',
        replacement: path.resolve(__dirname, 'src/lib/hooks')
      },
      {
        find: '@store',
        replacement: path.resolve(__dirname, 'src/store')
      },
      {
        find: '@styles',
        replacement: path.resolve(__dirname, 'src/styles')
      },
      {
        find: '@types',
        replacement: path.resolve(__dirname, 'src/lib/types')
      }
    ]
  },
  build: {
    outDir: './build',
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        }
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.hkound.pe.kr',
        changeOrigin: true
      }
    }
  }
});
