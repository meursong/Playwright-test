// src/pages/auth/LoginPage.ts
import { Page } from '@playwright/test';
import { PageActionHelper, ActionStep } from '@/helpers/page-action-helper';

export class LoginPage {
  private pageHelper: PageActionHelper;

  constructor(private page: Page) {
    this.pageHelper = new PageActionHelper(page);
  }

  async login(accountId: string, password: string): Promise<void> {
    const loginSteps: ActionStep[] = [
      {
        action: 'type',
        selector: '#id',  // 이메일 입력 필드
        value: accountId
      },
      {
        action: 'type',
        selector: '#pwd',  // 비밀번호 입력 필드
        value: password
      },
      {
        action: 'click',
        selector: 'button:has-text("로그인")'
      }
    ];

    await this.pageHelper.executeSteps(loginSteps);
  }

  async verifyLoginSuccess(): Promise<void> {
    const verificationSteps: ActionStep[] = [
      {
        action: 'expect',
        selector: 'text=사용자명',
        expectation: {
          type: 'visible'
        }
      }
    ];

    await this.pageHelper.executeSteps(verificationSteps);
  }

  async verifyLoginError(): Promise<void> {
    const verificationSteps: ActionStep[] = [
      {
        action: 'expect',
        selector: '.form-toast',
        expectation: {
          type: 'visible'
        }
      },
    ];

    await this.pageHelper.executeSteps(verificationSteps);
  }
}