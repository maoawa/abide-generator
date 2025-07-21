import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('mdui-')
        }
      }
    }),
    vueDevTools()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
