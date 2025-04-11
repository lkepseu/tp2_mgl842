import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'node', // Pour tester les composants Vue
    include: ['tests/**/*.test.{ts,js,vue}'], // Inclut les tests dans tests/
    coverage: {
      enabled: true,
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: './coverage',
      // lines: 80,
      // functions: 80,
      // branches: 70,
      // statements: 80,
      // thresholdAutoUpdate: false,
      // all: true, // inclure tous les fichiers, même non testés
    }
  },


});
