import { test } from "../fixtures.js";
import { AppPage} from "../pom/index.js";

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
});