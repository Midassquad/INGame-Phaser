import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ["6wlleu-ip-210-57-14-5.tunnelmole.net"],
  },
  plugins: [react()],
});
