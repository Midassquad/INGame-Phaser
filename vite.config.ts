import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ["1gudfu-ip-136-158-78-205.tunnelmole.net"],
  },
  plugins: [react()],
});
