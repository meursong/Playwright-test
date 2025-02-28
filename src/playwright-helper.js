const { chromium } = require('playwright');
require('dotenv').config();

const runTest = async (steps) => {
    const browser = await chromium.launch({ headless: false }); // 디버깅 시 headless: false
    const page = await browser.newPage();

    for (const step of steps) {
        console.log(`Executing: ${step.action}`);
        switch (step.action) {
            case 'goto':
                await page.goto(step.url, { waitUntil: 'domcontentloaded' });
                break;
            case 'type':
                console.log(process.env.USERNAME)
                const value = step.value === 'ENV_USERNAME' ? process.env.LOGIN_USERNAME :
                              step.value === 'ENV_PASSWORD' ? process.env.LOGIN_PASSWORD :
                              step.value;
                await page.waitForSelector(step.selector, { state: 'visible' });
                await page.fill(step.selector, value);
                break;
            case 'click':
                await page.waitForSelector(step.selector, { state: 'visible' });
                await page.click(step.selector);
                break;
            case 'waitForNavigation':
                await page.waitForNavigation();
                break;
            case 'assertUrl':
                const currentUrl = page.url();
                if (currentUrl !== step.expectedUrl) {
                    throw new Error(`Expected URL ${step.expectedUrl} but got ${currentUrl}`);
                }
                console.log(`✅ URL 확인 완료: ${currentUrl}`);
                break;
            case 'screenshot':
                await page.screenshot({ path: step.path });
                break;
            default:
                console.warn(`Unknown action: ${step.action}`);
        }
    }

    await browser.close();
}

module.exports = { runTest };
