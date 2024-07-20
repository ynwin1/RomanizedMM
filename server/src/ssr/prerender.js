import puppeteer from 'puppeteer';

export async function preRender(url) {
    let browser;
    try {
        // Launch a headless browser
        browser = await puppeteer.launch();
        // Open a new page in the browser
        const page = await browser.newPage();
        // Navigate to the URL and wait until the page is fully loaded
        await page.goto(url, {waitUntil: 'networkidle2'});
        return await page.content();
    } catch (error) {
        console.error('Error SSR rendering page:', error);
        throw error;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}