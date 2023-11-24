import { expect } from "../fixtures.js";

export class BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        this.expect = expect;
    }
}

class BaseOption extends BasePOM {
    async visible() {
        await this.expect(this.locator).toBeVisible();
    }

    async hidden() {
        await this.expect(this.locator).toBeHidden();
    }
}

export class TextOption extends BaseOption {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.locator = page;
    }

    async hasValue(value) {
        await this.expect(this.locator).toContainText(value);
    }
}

export class ButtonAction extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.locator = page;
    }

    async click() {
        await this.locator.click();
    }

    async hasValue(value) {
        await this.expect(this.locator).toHaveValue(value);
    }
}

export class BasePage extends BasePOM {
    async goto(params = {}) {
        let q = "";
        for (const key in params) {
            const value = params[key];
            if (value !== null) {
                q += `${key}=${value}`;
            }
        }
        await this.page.goto(`${q ? "?" + q : ""}`);
    }

    async reload() {
        await this.page.reload();
    }

    async close() {
        await this.page.close();
    }

    async checkVersion() {
        const text = await this.version.textContent();
        await this.expect(text).toMatch(/^v1\.\d+\.\d$/);
    }
}
