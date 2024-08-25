import assert from "node:assert";

describe("Foo", function () {
    it("Bar", function () {
        const actual = 1;
        const expected = 1;
        assert.equal(actual, expected, "Message");
    });
});