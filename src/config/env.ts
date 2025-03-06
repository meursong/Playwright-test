import dotenv from 'dotenv';
import { z } from 'zod';

// .env 파일 로드
dotenv.config();

// 환경 변수 검증을 위한 스키마
const envSchema = z.object({
  // 필수 환경 변수
  BASE_URL: z.string().url(),
  AUTH_USERNAME: z.string(),
  AUTH_PASSWORD: z.string(),

  // 선택적 환경 변수 (기본값 설정)
  HEADLESS: z.string().default('true'),
  BROWSER: z.enum(['chromium', 'firefox', 'webkit']).default('chromium'),
});

// 환경 변수 검증
export const env = envSchema.parse(process.env);
