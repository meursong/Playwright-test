// 테스트 설정

import { readFileSync } from 'fs-extra';
import yaml from 'yaml';
import path from 'path';

export interface TestConfig {
  retries: number;
  timeout: number;
  viewport: {
    width: number;
    height: number;
  };
  screenshots: {
    enabled: boolean;
    onFailure: boolean;
  };
}

const configPath = path.join(process.cwd(), 'tests/fixtures/test-configuaration.yml');
const configFile = readFileSync(configPath, 'utf8');
export const testConfig: TestConfig = yaml.parse(configFile);