// src/tests/saasdaService/auth/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/saasdaService/auth/LoginPage';

test.describe('로그인 테스트', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto('/service/auth/login');
  });

  test('올바른 자격 증명으로 로그인', async () => {
    await loginPage.login('#{correct-account-id}', '#{correct-password}');
    await loginPage.verifyLoginSuccess();
  });

  test('잘못된 자격 증명으로 로그인 시도', async () => {
    await loginPage.login('#{wrong-account-id}', '#{wrong-password}');
    await loginPage.verifyLoginError();
  });

  test('빈 필드로 로그인 시도', async ({ page }) => {
    await page.getByRole('button', { name: '로그인' }).click();
    await loginPage.verifyEmptyFieldErrors();
  });
});
