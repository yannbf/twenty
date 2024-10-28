import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';
import { defineConfig, mergeConfig } from 'vitest/config';
// import baseConfig from './packages/twenty-front/vite.config';

// More info at: https://storybook.js.org/docs/writing-tests/vitest-plugin
export default mergeConfig(
  // baseConfig({ command: 'serve', mode: 'development' }),
  {},
  defineConfig({
    plugins: [
      // See options at: https://storybook.js.org/docs/writing-tests/vitest-plugin#storybooktest
      storybookTest({
        configDir: './packages/twenty-front/.storybook',
      }),
    ],
    test: {
      name: 'storybook',
      browser: {
        enabled: true,
        headless: true,
        name: 'chromium',
        provider: 'playwright',
      },
      // Make sure to adjust this pattern to match your stories files.
      include: ['**/*.stories.?(m)[jt]s?(x)'],
      setupFiles: ['./packages/twenty-front/.storybook/vitest.setup.ts'],
    },
  }),
);
