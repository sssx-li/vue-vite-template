/// <reference types="vitest" />

import Vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import { defineConfig } from "vite";

import eslintPlugin from "vite-plugin-eslint";

import { presetAttributify, presetIcons, presetUno } from "unocss";
import Unocss from "unocss/vite";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

import { FileSystemIconLoader } from "unplugin-icons/loaders";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

function splitChunkFile(id) {
  if (id.includes("node_modules")) {
    const pkg = id
      .toString()
      .split("node_modules/")[1]
      .split("/")[1]
      .toString();
    if (pkg.includes("@vueuse")) {
      return "vueuse";
    }
    if (pkg.includes("vue")) {
      return "vue";
    }
  } else if (
    ["src/directives", "src/filters", "src/utils", "src/constants"].some(
      (dir) => id.includes(dir)
    )
  ) {
    return "utils";
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    // 启用类似 jest 的全局测试 API
    globals: true,
    reporters: ["html"],
    // 使用 happy-dom 模拟 DOM
    // 这需要你安装 happy-dom 作为对等依赖（peer dependency）
    environment: "happy-dom",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", ["html", { subdir: "src" }]],
      enabled: true, // 使用Vitest UI
    },
  },
  plugins: [
    Vue(),
    VueJsx(),
    eslintPlugin({
      include: ["src/**/*.ts", "src/**/*.js", "src/**/*.vue"],
    }),
    AutoImport({
      // dts: "./typing/auto.import.d.ts",
      dts: false,
      imports: [
        "vue",
        "vue-router",
        "pinia",
        "@vueuse/core",
        "vue-i18n",
        {
          from: "vue-router",
          imports: ["RouteRecordRaw"],
          type: true,
        },
      ],
      eslintrc: {
        enabled: false,
        filepath: "./.eslintrc-auto-import.json",
      },
      dirs: [
        "./src/hooks/**",
        "./src/service/**",
        "./src/utils/**",
        "./src/store/**",
        "./src/constants/**",
      ],
      vueTemplate: true,
    }),
    Components({
      // dts: "./typing/auto.components.d.ts",
      dts: false,
      resolvers: [
        IconsResolver({
          customCollections: ["sy"],
        }),
      ],
      dirs: ["src/**/components"],
    }),
    Icons({
      autoInstall: true,
      customCollections: {
        sy: FileSystemIconLoader("./src/assets/svgs", (svg) =>
          svg.replace(/^<svg /, '<svg fill="currentColor" ')
        ),
      },
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/svgs")],
      symbolId: "icon-[dir]-[name]",
    }),
    Unocss({
      presets: [presetUno(), presetAttributify(), presetIcons()],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js", // 解决控制台警告问题(bundler)
    },
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
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
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        manualChunks: (id) => splitChunkFile(id),
      },
    },
  },
});
