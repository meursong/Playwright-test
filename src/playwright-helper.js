const { chromium } = require('playwright');

const runTest = async (steps) => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    for (const step of steps) {
        console.log(`Executing: ${step.action}`);
        switch (step.action) {
            case 'goto':
                await page.goto(step.url);
                break;
            case 'type':
                await page.fill(step.selector, step.value);
                break;
            case 'press':
                await page.press(step.selector, step.key);
                break;
            case 'click':
                await page.click(step.selector);
                break;
            case 'waitForNavigation':
                await page.waitForSelector('<selector>');
                try {
                    await page.fill('<selector>', '<value>');
                } catch (error) {
                    console.log('Error:', error);
                }
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
