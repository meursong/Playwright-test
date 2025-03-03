import { test, expect } from '@playwright/test';
import { env } from '../../src/config/environment';

test.describe('기본 웹사이트 테스트', () => {
  test('홈페이지 로드 테스트', async ({ page }) => {
    await page.goto(env.BASE_URL);
    expect(await page.title()).not.toBe('');
  });

  test('로그인 테스트', async ({ page }) => {
    await page.goto(`${env.BASE_URL}/login`);

    await page.fill('input[name="username"]', env.TEST_USERNAME);
    await page.fill('input[name="password"]', env.TEST_PASSWORD);
    await page.click('button[type="submit"]');

    // 로그인 성공 확인
    await expect(page.locator('.user-profile')).toBeVisible();
  });
});