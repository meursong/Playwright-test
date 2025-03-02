const { chromium } = require('playwright');
const { resolveStepValue } = require('./value-resolver');
require('dotenv').config();

const runTest = async (steps) => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    const testContext = {}; // 테스트 실행 중 공유할 컨텍스트

    try {
        for (const step of steps) {
            console.log(`Executing: ${step.action}`);
            switch (step.action) {
                case 'goto':
                    await page.goto(step.url, { waitUntil: 'domcontentloaded' });
                    break;
                case 'type':
                    const value = resolveStepValue(step, testContext);
                    await page.waitForSelector(step.selector, { state: 'visible' });
                    await page.fill(step.selector, value);
                    break;
                case 'click':
                    await page.waitForSelector(step.selector, { state: 'visible' });
                    await page.click(step.selector);
                    break;
                case 'waitForLoadState':
                    await page.waitForLoadState('networkidle', {
                        timeout: 10000
                    });
                    break;
                case 'waitForURL':
                    await page.waitForURL(step.expectedUrl, {
                        timeout: 10000,  // 타임아웃 시간 설정
                        waitUntil: 'networkidle'  // 네트워크가 안정화될 때까지 대기
                    });
                    break;
                case 'assertUrl':
                    const currentUrl = page.url();
                    if (currentUrl !== step.expectedUrl) {
                        throw new Error(`Expected URL ${step.expectedUrl} but got ${currentUrl}`);
                    }
                    console.log(`URL 확인 완료: ${currentUrl}`);
                    break;
                case 'screenshot':
                    await page.screenshot({ path: step.path });
                    break;
                case 'wait':
                    const milliseconds = step.milliseconds || step.ms || (step.seconds * 1000) || 1000;
                    console.log(`${milliseconds}ms 동안 대기중...`);
                    await page.waitForTimeout(milliseconds);
                    break;
                default:
                    console.warn(`Unknown action: ${step.action}`);
            }
        }
    } finally {
        await browser.close();
    }
}
module.exports = { runTest };
