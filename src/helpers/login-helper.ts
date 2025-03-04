// src/tests/helpers/LoginHelper.ts
import { Page, expect } from '@playwright/test';

export class LoginHelper {
    constructor(private page: Page) {}

    async navigateToLoginPage() {
        await this.page.goto('/service/auth/login');
    }

    async fillLoginForm(email: string, password: string) {
        await this.page.getByLabel('이메일').fill(email);
        await this.page.getByLabel('비밀번호').fill(password);
    }

    async clickLoginButton() {
        await this.page.getByRole('button', { name: '로그인' }).click();
    }

    async verifyLoginSuccess() {
        await expect(this.page).toHaveURL('/dashboard');
        await expect(this.page.getByText('사용자명')).toBeVisible();
    }

    async verifyInvalidCredentialsError() {
        await expect(this.page.getByText('이메일 또는 비밀번호가 잘못되었습니다')).toBeVisible();
    }

    async verifyEmptyFieldErrors() {
        await expect(this.page.getByText('이메일을 입력해주세요')).toBeVisible();
        await expect(this.page.getByText('비밀번호를 입력해주세요')).toBeVisible();
    }
}