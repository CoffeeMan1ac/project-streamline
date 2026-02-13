import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  test: {
    globals: true, // This is the key fix!
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts", // Points to the file we created in Step 1
  },
});
