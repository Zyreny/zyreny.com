import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueRouter from 'unplugin-vue-router/vite';
import tailwindcss from '@tailwindcss/vite';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    Icons({
      autoInstall: true,
    }),
    Components({
      resolvers: [
        IconsResolver({
          prefix: false,
          alias: {
            s: 'heroicons-solid',
            o: 'heroicons-outline',
            m: 'heroicons-mini',
            x: 'heroicons-micro',
          },
        }),
      ],
      dts: false,
    }),
    AutoImport({
      imports: ['vue'],
      dts: true,
    }),
    VueRouter({
      routesFolder: 'src/pages',
      exclude: ['src/pages/**/components/*.vue', 'src/pages/**/layouts/*.vue'],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
