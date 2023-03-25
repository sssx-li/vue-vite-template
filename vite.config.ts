import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';

import eslintPlugin from 'vite-plugin-eslint';

import Unocss from 'unocss/vite';
import { presetAttributify, presetUno, presetIcons } from 'unocss';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueJsx(),
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
      resolvers: [
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
