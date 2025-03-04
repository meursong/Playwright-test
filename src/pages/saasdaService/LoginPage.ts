import { Page } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class LoginPage extends BasePage {
  // 로그인 페이지의 요소들을 정의
  private readonly usernameInput = '#username';
  private readonly passwordInput = '#password';
  private readonly loginButton = '#login-button';
  private readonly errorMessage = '.error-message';

  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string): Promise<void> {
    await this.waitAndFill(this.usernameInput, username);
    await this.waitAndFill(this.passwordInput, password);
    await this.waitAndClick(this.loginButton);
  }

  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }

  async isErrorVisible(): Promise<boolean> {
    return await this.isVisible(this.errorMessage);
  }
}