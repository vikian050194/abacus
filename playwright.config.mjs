// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    testDir: "e2e",
    testMatch: /.*-tests\.js/,
    workers: 4,
    retries: 0,
    fullyParallel: true,
    use: {
        viewport: null,
        browserName: "chromium",
        headless: false,
        screenshot: "only-on-failure",
        baseURL: "http://127.0.0.1:8000",
        trace: "on-first-retry"
    },
    webServer: {
        command: "npm run static",
        url: "http://127.0.0.1:8000",
        reuseExistingServer: !process.env.CI
    },
    expect: {
        timeout: 1000
    }
};

export default config;
