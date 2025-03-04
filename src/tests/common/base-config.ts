// src/tests/common/base-config.ts
import { PlaywrightTestConfig } from '@playwright/test';
import { join } from 'path';

export const baseConfig: PlaywrightTestConfig = {
  timeout: 60000,
  testMatch: ['**/*.(spec|test).ts'],  // .spec.ts와 .test.ts 모두 실행
  retries: process.env.NODE_ENV === 'prod' ? 2 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
      },
    },
  ],
};