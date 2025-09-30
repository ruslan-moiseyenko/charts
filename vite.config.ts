import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/charts/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    assetsDir: "assets",
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    },
    copyPublicDir: true
  }
});
