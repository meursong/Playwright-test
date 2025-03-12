// src/tests/saasdaService/auth/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/saasdaService/auth/LoginPage.ts';
import dotenv from 'dotenv'

dotenv.config();

test.describe('로그인 테스트', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    // 1. 메인 페이지로 이동
    await page.goto('/');

    // 2. 로그인 링크 클릭
    await page.getByRole('link', { name: '로그인' }).click();

    // 3. 로그인 페이지로 이동됐는지 확인
    await expect(page).toHaveURL('/service/auth/login');

  });

  test('정상 로그인', async ({ page }) => {
    await loginPage.login(
      process.env.AUTH_USERNAME!,
      process.env.AUTH_PASSWORD!
    );

    // 로그인 성공 검증:
    // 1. 메인 페이지로 이동했는지 확인
    await expect(page).toHaveURL('/service');

    // 2. top-user 클래스를 가진 클릭 가능한 요소가 보이는지 확인
    const topUserElement = page.locator('.top-user');
    await expect(topUserElement).toBeVisible();
    await expect(topUserElement).toBeEnabled();
  });

  test('잘못된 아이디 패스워드', async () => {
    await loginPage.login('wrongaccountid', 'wrongpassword');
    await loginPage.verifyLoginError();
  });
});
