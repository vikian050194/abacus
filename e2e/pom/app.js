import { BasePage, BasePOM, TextOption, ButtonAction } from "./base.js";

class ResultRow extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.index = new TextOption(page.locator("td").nth(0));
        this.count = new TextOption(page.locator("td").nth(1));
        this.name = new TextOption(page.locator("td").nth(2));
        this.delete = new ButtonAction(page.locator("td").nth(3));
    }

    async isValidIndex(expected) {
        await this.count.hasValue(`${expected}`);
    }

    async isValidCount(expected) {
        await this.count.hasValue(`${expected}`);
    }

    async isValidName(expected) {
        await this.name.hasValue(expected);
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
        this.input = page.locator("input");

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

    async empty() {
        const row = this.page.locator("ol li");
        await this.expect(row).toHaveCount(0);
    }

    getRowPom(index) {
        const row = this.page.locator("li").nth(index);
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
