import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['./lib'],
    }),
    libInjectCss(),
  ],
  resolve: {
    alias: {
      '@styles': resolve(__dirname, './lib/styles'),
      '@components': resolve(__dirname, './lib/components')
    },
  },
  build: {
    minify: true,
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es'],
      name: 'components-ui',
      fileName: 'main',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
  },
});
