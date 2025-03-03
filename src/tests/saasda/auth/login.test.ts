import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/saasda/LoginPage';
import { env } from '@config/env';

test.describe('로그인 기능', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto('/login');
  });

  test('정상적인 로그인', async ({ page }) => {
    await loginPage.login(env.AUTH_USERNAME, env.AUTH_PASSWORD);
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('잘못된 비밀번호로 로그인 실패', async () => {
    await loginPage.login(env.AUTH_USERNAME, 'wrong_password');
    expect(loginPage.getErrorMessage()).toContain('로그인 실패');
  });
});