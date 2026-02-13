import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    reporters: ["default", "junit"],
    outputFile: {
      junit: "./reports/junit.xml",
    },
    environment: "jsdom",
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json-summary", "cobertura", "html"],
      reportsDirectory: "./coverage",
      include: ["src/**/*.{ts,tsx,js,jsx}"],
      exclude: ["**/*.test.*"],
    },
  },
});
