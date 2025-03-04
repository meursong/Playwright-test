// src/tests/saasdaAdmin/config.ts
import { PlaywrightTestConfig } from '@playwright/test';
import { baseConfig } from '../common/baseConfig';
import { join } from 'path';

const config: PlaywrightTestConfig = {
  ...baseConfig,
  testDir: './',
  use: {
    ...baseConfig.use,
    baseURL: process.env.SAASDA_ADMIN_URL,
  },
  outputDir: join(__dirname, '../../../test-results/saasdaAdmin'),
};

export default config;