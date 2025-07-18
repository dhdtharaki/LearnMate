import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: '/',
  plugins: [react()],
  preview: {
      port: 5173,
      strictPort: true,
      allowedHosts: true
  },
  server: {
      port: 5173,
      strictPort: true,
      host: true,
  },
});