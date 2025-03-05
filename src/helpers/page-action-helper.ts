// src/helpers/page-action-helper.ts
import { Page, expect } from '@playwright/test';

export type ActionStep = {
    action: 'goto' | 'type' | 'click' | 'wait' | 'select' | 'check' | 'screenshot' | 'expect';
    selector?: string;
    value?: string;
    url?: string;
    timeout?: number;
    expectation?: {
        type: 'visible' | 'hidden' | 'enabled' | 'disabled' | 'hasText' | 'hasValue';
        value?: string;
    };
};

export class PageActionHelper {
    constructor(private page: Page) {}

    async executeSteps(steps: ActionStep[]): Promise<void> {
        for (const step of steps) {
            console.log(`실행 중: ${step.action}`);
            try {
                await this.executeStep(step);
            } catch (error) {
                console.error(`스텝 실행 중 에러 발생: ${step.action}`, error);
                throw error;
            }
        }
    }

    private async executeStep(step: ActionStep): Promise<void> {
        switch (step.action) {
            case 'goto':
                if (!step.url) throw new Error('URL이 필요합니다');
                await this.page.goto(step.url);
                break;

            case 'type':
                if (!step.selector || step.value === undefined)
                    throw new Error('selector와 value가 필요합니다');
                await this.page.fill(step.selector, step.value);
                break;

            case 'click':
                if (!step.selector) throw new Error('selector가 필요합니다');
                await this.page.click(step.selector);
                break;

            case 'wait':
                if (!step.selector) throw new Error('selector가 필요합니다');
                await this.page.waitForSelector(step.selector, {
                    timeout: step.timeout || 30000
                });
                break;

            case 'select':
                if (!step.selector || !step.value)
                    throw new Error('selector와 value가 필요합니다');
                await this.page.selectOption(step.selector, step.value);
                break;

            case 'check':
                if (!step.selector) throw new Error('selector가 필요합니다');
                await this.page.check(step.selector);
                break;

            case 'screenshot':
                await this.page.screenshot({
                    path: `screenshots/${new Date().toISOString()}.png`
                });
                break;

            case 'expect':
                if (!step.selector || !step.expectation)
                    throw new Error('selector와 expectation이 필요합니다');
                await this.handleExpectation(step);
                break;

            default:
                throw new Error(`알 수 없는 액션: ${step.action}`);
        }
    }

    private async handleExpectation(step: ActionStep): Promise<void> {
        if (!step.expectation || !step.selector) return;

        const element = this.page.locator(step.selector);
        switch (step.expectation.type) {
            case 'visible':
                await expect(element).toBeVisible();
                break;
            case 'hidden':
                await expect(element).toBeHidden();
                break;
            case 'enabled':
                await expect(element).toBeEnabled();
                break;
            case 'disabled':
                await expect(element).toBeDisabled();
                break;
            case 'hasText':
                if (step.expectation.value) {
                    await expect(element).toHaveText(step.expectation.value);
                }
                break;
            case 'hasValue':
                if (step.expectation.value) {
                    await expect(element).toHaveValue(step.expectation.value);
                }
                break;
        }
    }
}