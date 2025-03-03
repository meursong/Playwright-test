// Playwright 관련 헬퍼

import { chromium, Page } from 'playwright';
import { TestStep } from '../config/types';
import { resolveStepValue } from '../core/value-resolver';
import { env } from '../config/env-config';

export const runTest = async (steps: TestStep[]): Promise<void> => {
  const browser = await chromium.launch({
    headless: env.HEADLESS
  });
  const page = await browser.newPage();
  const testContext: Record<string, string> = {};

  try {
    for (const step of steps) {
      console.log(`Executing: ${step.action}`);

      switch (step.action) {
        case 'goto':
          if (!step.url) throw new Error('URL is required for goto action');
          await page.goto(step.url, { waitUntil: 'domcontentloaded' });
          break;

        case 'type':
          if (!step.selector) throw new Error('Selector is required for type action');
          const value = resolveStepValue(step, testContext);
          await page.waitForSelector(step.selector, { state: 'visible' });
          await page.fill(step.selector, value);
          break;

        case 'click':
          if (!step.selector) throw new Error('Selector is required for click action');
          await page.waitForSelector(step.selector, { state: 'visible' });
          await page.click(step.selector);
          break;

        case 'waitForLoadState':
          await page.waitForLoadState('networkidle', {
            timeout: 10000
          });
          break;

        case 'waitForURL':
          if (!step.expectedUrl) throw new Error('Expected URL is required for waitForURL action');
          await page.waitForURL(step.expectedUrl, {
            timeout: 10000,
            waitUntil: 'networkidle'
          });
          break;

        case 'assertUrl':
          if (!step.expectedUrl) throw new Error('Expected URL is required for assertUrl action');
          const currentUrl = page.url();
          if (currentUrl !== step.expectedUrl) {
            throw new Error(`Expected URL ${step.expectedUrl} but got ${currentUrl}`);
          }
          console.log(`URL 확인 완료: ${currentUrl}`);
          break;

        case 'screenshot':
          if (!step.path) throw new Error('Path is required for screenshot action');
          await page.screenshot({ path: step.path });
          break;

        case 'wait':
          const milliseconds = step.milliseconds || step.ms || (step.seconds ? step.seconds * 1000 : 1000);
          console.log(`${milliseconds}ms 동안 대기중...`);
          await page.waitForTimeout(milliseconds);
          break;

        default:
          console.warn(`Unknown action: ${step.action}`);
      }
    }
  } finally {
    await browser.close();
  }
};