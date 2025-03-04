// src/tests/saasdaLearn/config.ts
import { PlaywrightTestConfig } from '@playwright/test';
import { baseConfig } from '../common/base-config';
import { join } from 'path';

const config: PlaywrightTestConfig = {
  ...baseConfig,
  testDir: './',
  use: {
    ...baseConfig.use,
    baseURL: process.env.SAASDA_LEARN_URL,
  },
  outputDir: join(__dirname, '../../../test-results/saasdaLearn'),
};

export default config;