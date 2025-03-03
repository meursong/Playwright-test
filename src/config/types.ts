// 공통 타입 정의

export interface TestStep {
  action: 'goto' | 'type' | 'click' | 'waitForLoadState' | 'waitForURL' | 'assertUrl' | 'screenshot' | 'wait';
  selector?: string;
  url?: string;
  value?: string;
  path?: string;
  expectedUrl?: string;
  milliseconds?: number;
  ms?: number;
  seconds?: number;
}

export interface TestConfig {
  name: string;
  steps: TestStep[];
}

export interface TestResult {
  name: string;
  status: 'success' | 'failed';
  executionTime?: number;
  error?: string;
}