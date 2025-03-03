import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  BASE_URL: z.string().url(),
  HEADLESS: z.string().transform(val => val === 'true'),
  SCREENSHOT_DIR: z.string(),
  TEST_USERNAME: z.string(),
  TEST_PASSWORD: z.string(),
});

export type Environment = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);