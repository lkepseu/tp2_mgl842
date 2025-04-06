import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000', // Remplacez cela par l'URL correcte de votre application en développement
  },
  reporter: [['html', { open: 'never' }]], // Génère un rapport HTML
});
