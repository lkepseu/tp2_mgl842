import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'http://localhost:3002', // Remplacez cela par l'URL correcte de votre application en développement
  },
  reporter: [['html', { open: 'never' }]], // Génère un rapport HTML
});
