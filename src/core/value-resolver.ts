// 값 처리

import { env } from '../config/env-config'; // 이전에 작성한 env 설정 파일
import { TestStep } from '../config/types';

interface DynamicValue {
  type: 'timestamp' | 'random';
  length?: number;
}

interface TestContext {
  [key: string]: string;
}

export const resolveValue = (value: string, context: TestContext = {}): string => {
  // ENV_ 로 시작하는 환경 변수 처리
  if (value.startsWith('ENV_')) {
    const envKey = value.replace('ENV_', '');
    return process.env[envKey] || '';
  }

  // ${} 형식의 변수 처리
  if (value.includes('${')) {
    return value.replace(/\${([^}]+)}/g, (match, key) => {
      return context[key] || process.env[key] || match;
    });
  }

  // JSON 형식의 동적 값 처리
  if (value.startsWith('{') && value.endsWith('}')) {
    try {
      const dynamicValue = JSON.parse(value) as DynamicValue;
      if (dynamicValue.type === 'timestamp') {
        return new Date().toISOString();
      }
      if (dynamicValue.type === 'random') {
        const length = dynamicValue.length || 8;
        return Math.random().toString(36).substring(2, length + 2);
      }
    } catch (e) {
      console.warn('동적 값 파싱 실패:', e);
    }
  }

  return value;
};

export const resolveStepValue = (step: TestStep, testContext: TestContext = {}): string => {
  if (!step.value) return '';

  return resolveValue(step.value, {
    ...testContext,
    LOGIN_USERNAME: env.TEST_USERNAME,
    LOGIN_PASSWORD: env.TEST_PASSWORD
  });
};