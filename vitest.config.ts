// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      all: true,
      include: ['src/**/*.{ts,tsx}'],
      reporter: ['text', 'html', 'lcov'],
    },
  },
});
