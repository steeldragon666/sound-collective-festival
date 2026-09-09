import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'plugin-inspect-react-code'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  // Asset bundle was uploaded under github-assets-upload/public — serve that as the
  // static dir so /brand/*, /artists/*, /admat-hero.jpg etc. resolve without moving files.
  publicDir: 'github-assets-upload/public',
  plugins: [inspectAttr(), react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
