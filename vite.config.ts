import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';

import eslintPlugin from 'vite-plugin-eslint';

import Unocss from 'unocss/vite';
import { presetAttributify, presetUno, presetIcons } from 'unocss';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueJsx(),
    vueSetupExtend(),
    eslintPlugin({
      include: [
        'src/**/*.ts',
        'src/**/*.js',
        'src/**/*.vue',
        'src/*.ts',
        'src/*.js',
        'src/*.vue',
      ],
    }),
    AutoImport({
      dts: './typing/auto.import.d.ts',
      imports: [
        'vue',
        'vue-router',
        'pinia',
        '@vueuse/core',
        {
          from: 'vue-router',
          imports: ['RouteRecordRaw'],
          type: true,
        },
      ],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
      },
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      dts: './typing/.auto.components.d.ts',
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
        IconsResolver({
          customCollections: ['sy'],
        }),
      ],
    }),
    Icons({
      autoInstall: true,
      customCollections: {
        sy: FileSystemIconLoader('./src/assets/svgs', (svg) =>
          svg.replace(/^<svg /, '<svg fill="currentColor" ')
        ),
      },
    }),
    Unocss({
      presets: [presetUno(), presetAttributify(), presetIcons()],
      rules: [
        [
          'fhc',
          {
            display: 'flex',
            'justify-content': 'center',
            'align-items': 'center',
          },
        ],
        [
          'fvc',
          {
            display: 'flex',
            'justify-content': 'center',
            'align-items': 'center',
            'flex-direction': 'column',
          },
        ],
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/mixins.scss" as *;`,
      },
    },
  },
});
