import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: true, // This allows the tunnel URL to work
    host: true,
  },
  plugins: [react(), tailwindcss()],
});
