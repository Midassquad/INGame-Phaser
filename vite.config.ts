import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ["zxic9a-ip-136-158-78-6.tunnelmole.net"],
  },
  plugins: [react()],
  base: "/INGame-Phaser/",
});
