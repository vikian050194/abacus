import { BasePage, BasePOM, TextOption, ButtonAction } from "./base.js";

class ResultRow extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.a = new TextOption(page.locator("span").nth(0));
        this.op = new TextOption(page.locator("span").nth(1));
        this.b = new TextOption(page.locator("span").nth(2));
        this.actual = new TextOption(page.locator(".actual"));
        this.expected = new TextOption(page.locator(".expected"));
    }

    async isValidIndex(expected) {
        await this.count.hasValue(`${expected}`);
    }

    async hasExpected(value = true) {
        if (value) {
            await this.expected.visible();
        } else {
            await this.expected.hidden();
        }
    }
}

export class AppPage extends BasePage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.total = page.locator("#total");
        this.count = page.locator("#count");
        this.score = page.locator("#score");

        this.task = page.locator("#task");
        this.answer = page.locator("#answer");

        this.restartButton = new ButtonAction(page.locator("#restart"));
    }

    async goto(seed = null) {
        await super.goto({ seed });
    }

    async restart() {
        await this.restartButton.click();
    }

    async hasTotal(value) {
        await this.expect(this.total).toContainText(`total: ${value}`);
    }

    async hasCount(value) {
        await this.expect(this.count).toContainText(`index: ${value}`);
    }

    async hasScore(value) {
        await this.expect(this.score).toContainText(`score: ${value}`);
    }

    async hasTask(a, op, b) {
        await this.expect(this.task).toContainText(`${a}${op}${b}`);
    }

    async setAnswer(value) {
        await this.answer.fill(value.toString());
        await this.answer.press("Enter");
    }

    async empty() {
        const row = this.page.locator("ol li");
        await this.expect(row).toHaveCount(0);
    }

    async getResultRowPom(index) {
        const row = await this.page.locator("li").nth(index);
        const rowPom = new ResultRow(row);
        return rowPom;
    }

    async isMessageVisible(visible = true) {
        if (visible) {
            await this.message.isVisible();
        } else {
            await this.message.isHidden();
        }
    }
}
