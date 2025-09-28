import { chromium } from "playwright";
import * as fs from "fs";
import * as path from "path";
import { logInfo } from "./logger";

function getTimestamp(): string {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

export async function runPlaywrightTask(): Promise<void> {
    const browser = await chromium.launch({
        executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
        headless: true
    });

    const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
    await page.goto("https://example.com");

    const screenshotsDir = path.join(process.cwd(), "screenshots");
    if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir);
    }
    const filename = `screenshot-${getTimestamp()}.png`;
    await page.screenshot({ path: path.join(screenshotsDir, filename) });

    await browser.close();
    logInfo("Playwright task finished successfully");
}
