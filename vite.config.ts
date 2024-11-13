import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint2";
import vueDevTools from "vite-plugin-vue-devtools";

const build = process?.env?.NODE_ENV == "production";

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    eslint({
      build,
      cache: false,
      fix: build,
    }),
  ],
  build: {
    chunkSizeWarningLimit: 2000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 4000,
  },
});
