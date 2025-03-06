import { PlaywrightTestConfig } from '@playwright/test';
import { env } from './env';

const config: PlaywrightTestConfig = {
  testDir: '../../tests',  // 프로젝트 루트의 tests 디렉토리 기준
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: env.BASE_URL,
    headless: env.HEADLESS === 'true',
    browserName: env.BROWSER,
    actionTimeout: 0,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
};

export default config;