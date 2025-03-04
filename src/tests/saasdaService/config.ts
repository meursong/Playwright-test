// src/tests/saasdaService/config.ts
import { PlaywrightTestConfig } from '@playwright/test';
import { baseConfig } from '../common/baseConfig';
import { join } from 'path';
import dotenv from 'dotenv';
import path from 'path';

// 현재 환경 설정
const env = process.env.NODE_ENV || 'dev';

// 현재 디렉토리의 환경 변수 파일 로드
dotenv.config({
  path: path.join(__dirname, `.env.${env}`),
});

const config: PlaywrightTestConfig = {
  ...baseConfig,
  testDir: './',
  use: {
    ...baseConfig.use,
    baseURL: process.env.BASE_URL,
  },
  outputDir: join(__dirname, '../../../test-results/saasdaService'),
};

export default config;