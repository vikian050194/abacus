import { test as base, expect as exp, chromium } from "@playwright/test";

export const test = base.extend({
    // eslint-disable-next-line no-empty-pattern
    context: async ({ }, use) => {
        const context = await chromium.launch({
            headless: false,
            slowMo: 100,
            args: [
                "--start-maximized"
            ]
        });

        await use(context);
        await context.close();
    }
});

export const expect = exp;