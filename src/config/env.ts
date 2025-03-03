import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

// 환경 변수 검증을 위한 스키마
const envSchema = z.object({
  BASE_URL: z.string().url(),
  AUTH_USERNAME: z.string(),
  AUTH_PASSWORD: z.string(),
  ENVIRONMENT: z.enum(['local', 'dev', 'staging', 'prod']).default('dev'),
  HEADLESS: z.string().transform(x => x === 'true').default('false'),
});

// 환경 변수 검증 및 타입 생성
const validateEnv = () => {
  try {
    return envSchema.parse({
      BASE_URL: process.env.BASE_URL,
      AUTH_USERNAME: process.env.AUTH_USERNAME,
      AUTH_PASSWORD: process.env.AUTH_PASSWORD,
      ENVIRONMENT: process.env.ENVIRONMENT,
      HEADLESS: process.env.HEADLESS,
    });
  } catch (error) {
    console.error('환경 변수 검증 실패:', error);
    process.exit(1);
  }
};

export const env = validateEnv();