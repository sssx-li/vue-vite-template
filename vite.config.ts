import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import eslintPlugin from 'vite-plugin-eslint';

import Unocss from 'unocss/vite';
import { presetAttributify, presetUno, presetIcons } from 'unocss';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
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
    }),
    Components({
      dts: './typing/.auto.components.d.ts',
      resolvers: [],
    }),
    Unocss({
      presets: [presetUno(), presetAttributify(), presetIcons()],
      rules: [
        ['fac', { display: 'flex', 'align-items': 'center' }],
        ['fjc', { display: 'flex', 'justify-content': 'center' }],
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
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/mixins.scss" as *;`,
      },
    },
  },
});
