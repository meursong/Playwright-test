// 설정 파일 로더

import { readFileSync } from 'fs';
import yaml from 'yaml';
import { TestConfig } from '../config/types';

export const loadTestConfig = (filePath: string): TestConfig => {
  const fileContent = readFileSync(filePath, 'utf8');
  return filePath.endsWith('.yaml') || filePath.endsWith('.yml')
    ? yaml.parse(fileContent)
    : JSON.parse(fileContent);
};