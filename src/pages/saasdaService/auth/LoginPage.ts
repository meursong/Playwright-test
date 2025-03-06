// src/pages/auth/LoginPage.ts
import { Page } from '@playwright/test';
import { PageActionHelper, ActionStep } from '@/helpers/page-action-helper';

export class LoginPage {
  private pageHelper: PageActionHelper;

  constructor(private page: Page) {
    this.pageHelper = new PageActionHelper(page);
  }

  async login(email: string, password: string): Promise<void> {
    const loginSteps: ActionStep[] = [
      {
        action: 'type',
        selector: 'label:has-text("이메일")',
        value: email
      },
      {
        action: 'type',
        selector: 'label:has-text("비밀번호")',
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
        selector: 'text=이메일 또는 비밀번호가 잘못되었습니다',
        expectation: {
          type: 'visible'
        }
      }
    ];

    await this.pageHelper.executeSteps(verificationSteps);
  }

  async verifyEmptyFieldErrors(): Promise<void> {
    const verificationSteps: ActionStep[] = [
      {
        action: 'expect',
        selector: 'text=이메일을 입력해주세요',
        expectation: {
          type: 'visible'
        }
      },
      {
        action: 'expect',
        selector: 'text=비밀번호를 입력해주세요',
        expectation: {
          type: 'visible'
        }
      }
    ];

    await this.pageHelper.executeSteps(verificationSteps);
  }
}