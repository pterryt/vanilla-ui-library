import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./"),
      "@components": path.resolve(__dirname, "./components"),
      "@layout": path.resolve(__dirname, "./components/layout"),
      "@locales": path.resolve(__dirname, "./locales"),
      "@assets": path.resolve(__dirname, "./assets")
    }
  },
  server: {
    open: "/main.html"
  }
});