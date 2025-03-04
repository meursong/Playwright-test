// src/tests/saasdaService/auth/login.spec.ts
import { test, expect } from '@playwright/test';

test.describe('로그인 테스트', () => {
  test.beforeEach(async ({ page }) => {
    // 각 테스트 전에 로그인 페이지로 이동
    await page.goto('/service/auth/login');
  });

  test('올바른 자격 증명으로 로그인', async ({ page }) => {
    // 로그인 폼 입력
    await page.getByLabel('이메일').fill('test@example.com');
    await page.getByLabel('비밀번호').fill('password123');

    // 로그인 버튼 클릭
    await page.getByRole('button', { name: '로그인' }).click();

    // 로그인 성공 후 리다이렉션 확인
    await expect(page).toHaveURL('/dashboard'); // 실제 리다이렉션 URL에 맞게 수정 필요

    // 로그인 성공 상태 확인 (예: 사용자 이름 표시 여부)
    await expect(page.getByText('사용자명')).toBeVisible();
  });

  test('잘못된 자격 증명으로 로그인 시도', async ({ page }) => {
    await page.getByLabel('이메일').fill('wrong@example.com');
    await page.getByLabel('비밀번호').fill('wrongpassword');

    await page.getByRole('button', { name: '로그인' }).click();

    // 에러 메시지 확인
    await expect(page.getByText('이메일 또는 비밀번호가 잘못되었습니다')).toBeVisible();
  });

  test('빈 필드로 로그인 시도', async ({ page }) => {
    // 빈 상태로 로그인 버튼 클릭
    await page.getByRole('button', { name: '로그인' }).click();

    // 필수 입력 필드 검증 메시지 확인
    await expect(page.getByText('이메일을 입력해주세요')).toBeVisible();
    await expect(page.getByText('비밀번호를 입력해주세요')).toBeVisible();
  });
});