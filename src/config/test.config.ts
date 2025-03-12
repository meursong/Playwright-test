import { PlaywrightTestConfig } from '@playwright/test';
import { env } from './env';

const config: PlaywrightTestConfig = {
  testDir: '../../tests',  // 프로젝트 루트의 tests 디렉토리 기준
  timeout: 30000,
  expect: {
    timeout: 10000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: env.BASE_URL,
    browserName: env.BROWSER,
    headless: env.HEADLESS === 'true',
    navigationTimeout: 30000,  // 페이지 탐색 타임아웃
    actionTimeout: 15000,      // 액션(클릭 등) 타임아웃
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
};

export default config;