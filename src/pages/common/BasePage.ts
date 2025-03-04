import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  protected async waitAndClick(selector: string): Promise<void> {
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  protected async waitAndFill(selector: string, value: string): Promise<void> {
    await this.page.waitForSelector(selector);
    await this.page.fill(selector, value);
  }

  protected async getText(selector: string): Promise<string> {
    return await this.page.locator(selector).innerText();
  }

  protected async isVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }
}