import { test } from "../fixtures.js";
import { AppPage } from "../pom/index.js";

test.describe("App", () => {
    test("Without seed", async ({ page }) => {
        // Arrange
        const pom = new AppPage(page);

        // Act
        await pom.goto();

        // Assert
        await pom.hasTotal(10);
        await pom.hasCount(0);
        await pom.hasScore(0);
    });

    test("With seed", async ({ page }) => {
        // Arrange
        const pom = new AppPage(page);

        // Act
        await pom.goto("test");

        // Assert
        await pom.hasTotal(10);
        await pom.hasCount(0);
        await pom.hasScore(0);
    });

    test("All tasks with seed (cyrb128->sfc32)", async ({ page }) => {
        // Arrange
        const pom = new AppPage(page);

        // Act
        await pom.goto("test");
        await pom.restart();

        // Assert
        await pom.hasTotal(10);
        await pom.hasCount(0);
        await pom.hasScore(0);

        const testData = [
            [1, 1, 73, 66, 139],
            [2, 2, 32, 80, 112],
            [3, 3, 81, 95, 176],
            [4, 4, 34, 29, 63],
            [5, 5, 68, 15, 83],
            [6, 6, 18, 26, 44],
            [7, 7, 15, 92, 107],
            [8, 8, 32, 95, 127],
            [9, 9, 35, 37, 72],
            [10, 10, 50, 13, 63]
        ];

        const operator = "+";
        for (const [count, score, a, b, sum] of testData) {
            await pom.hasTask(a, operator, b);
            await pom.setAnswer(sum);

            await pom.hasCount(count);
            await pom.hasScore(score);
        }

        for (let i = 0; i < testData.length; i++) {
            const row = await pom.getResultRowPom(i);
            const data = testData[i];
            await row.a.hasValue(data[2].toString());
            await row.op.hasValue(operator);
            await row.b.hasValue(data[3].toString());
            await row.actual.hasValue(data[4].toString());
            await row.hasExpected(false);
        }
    });

    test("Wrong answers", async ({ page }) => {
        // Arrange
        const pom = new AppPage(page);

        // Act
        await pom.goto("test");
        await pom.restart();

        // Assert
        await pom.hasTotal(10);
        await pom.hasCount(0);
        await pom.hasScore(0);

        const ohNo = 100500;

        const testData = [
            [1, 0, 73, 66, 139],
            [2, 0, 32, 80, 112],
            [3, 0, 81, 95, 176],
            [4, 0, 34, 29, 63],
            [5, 0, 68, 15, 83],
            [6, 0, 18, 26, 44],
            [7, 0, 15, 92, 107],
            [8, 0, 32, 95, 127],
            [9, 0, 35, 37, 72],
            [10, 0, 50, 13, 63]
        ];

        const operator = "+";

        for (const [count, score, a, b] of testData) {
            await pom.hasTask(a, operator, b);
            await pom.setAnswer(ohNo);

            await pom.hasCount(count);
            await pom.hasScore(score);
        }

        for (let i = 0; i < testData.length; i++) {
            const row = await pom.getResultRowPom(i);
            const data = testData[i];
            await row.a.hasValue(data[2].toString());
            await row.op.hasValue(operator);
            await row.b.hasValue(data[3].toString());
            await row.actual.hasValue(ohNo.toString());
            await row.expected.hasValue(data[4].toString());
        }
    });
});