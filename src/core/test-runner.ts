// 테스트 실행 핵심 클래스

import { chromium, Browser, Page } from 'playwright';
import { env } from '../config/env-config';
import { testConfig } from '../config/test-config';
import { FileHandler } from '../helpers/file-handler';

export class TestRunner {
  private browser?: Browser;
  private page?: Page;

  async init() {
    this.browser = await chromium.launch({
      headless: env.HEADLESS
    });
    this.page = await this.browser.newPage({
      viewport: testConfig.viewport
    });
  }

  async navigateToPage(url: string) {
    if (!this.page) throw new Error('Browser not initialized');
    await this.page.goto(url);
  }

  async takeScreenshot(testName: string) {
    if (!this.page) throw new Error('Browser not initialized');
    const screenshot = await this.page.screenshot();
    return FileHandler.saveScreenshot(testName, screenshot);
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}