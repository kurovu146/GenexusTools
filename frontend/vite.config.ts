import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: '@components', replacement: resolve(__dirname, 'src/components') },
      { find: '@features', replacement: resolve(__dirname, 'src/features') },
      { find: '@contexts', replacement: resolve(__dirname, 'src/contexts') },
      { find: '@pages', replacement: resolve(__dirname, 'src/pages') },
    ]
  }
});
