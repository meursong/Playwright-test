// src/tests/saasdaService/auth/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/saasdaService/auth/LoginPage.ts';
import dotenv from 'dotenv'

dotenv.config();

test.describe('로그인 테스트', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto('/service/auth/login');
  });

  test('정상 로그인', async () => {
    await loginPage.login(
      process.env.AUTH_USERNAME!,
      process.env.AUTH_PASSWORD!
    );
    await loginPage.verifyLoginSuccess();
  });

  test('잘못된 아이디 패스워드', async () => {
    await loginPage.login('wrongaccountid', 'wrongpassword');
    await loginPage.verifyLoginError();
  });

  test('빈 필드로 로그인 시도', async ({ page }) => {
    await page.getByRole('button', { name: '로그인' }).click();
    await loginPage.verifyEmptyFieldErrors();
  });
});
