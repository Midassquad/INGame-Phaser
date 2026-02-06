import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ["rb1obc-ip-136-158-78-6.tunnelmole.net"],
  },
  plugins: [react()],
});
