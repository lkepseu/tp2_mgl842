import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom', // Pour tester les composants Vue
    include: ['tests/**/*.test.{ts,js,vue}'], // Inclut les tests dans tests/
  },
  coverage: {
    reporter: ['text', 'lcov'], // 'lcov' requis pour Coveralls
    exclude: ['node_modules/', 'dist/', '.output/'],
  },
});
