const { chromium } = require('playwright');
require('dotenv').config();

const runTest = async (steps) => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

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
                    console.log(value);
                    break;
                case 'click':
                    await page.waitForSelector(step.selector, { state: 'visible' });
                    await page.click(step.selector);
                    break;
                case 'waitForNavigation':
                    await page.waitForNavigation({ waitUntil: 'networkidle' });
                    break;
                case 'waitForURL':
                    await page.waitForURL(step.expectedUrl, {
                        timeout: 3000,  // 타임아웃 시간 증가
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
                default:
                    console.warn(`Unknown action: ${step.action}`);
            }
        }
    } finally {
        await browser.close();
    }
}
module.exports = { runTest };
