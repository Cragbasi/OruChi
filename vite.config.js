import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "news_explorer", // add this field
  plugins: [react()],
  server: {
    port: 3000,
  },
});
