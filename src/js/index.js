import { Builder, convert, replace } from "fandom";

const randomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

document.addEventListener("DOMContentLoaded", function () {
    const builder = new Builder();

    const $root = document.getElementById("root");

    $root.classList.add("container");

    const TASK = "task";
    const TOTAL = "total";
    const INDEX = "count";
    const SCORE = "score";

    let total = 10;
    let index = 0;
    let score = 0;

    const min = 1;
    const max = 99;

    let expected = 0;
    let actual = 0;

    const updateTask = (description) => {
        document.getElementById(TASK).innerText = description;
    };

    const updateScore = (total, index, score) => {
        document.getElementById(TOTAL).innerText = `total: ${total}`;
        document.getElementById(INDEX).innerText = `index: ${index}`;
        document.getElementById(SCORE).innerText = `score: ${score}`;
    };

    const clearInput = () => {
        const input = document.querySelector("input");
        input.value = "";
        input.focus();
    };

    const generate = () => {
        const a = randomInt(min, max);
        const b = randomInt(min, max);
        expected = a + b;
        updateTask(`${a}+${b}`);
    };

    const onChange = (e) => {
        actual = parseInt(e.target.value);
        score += expected === actual ? 1 : 0;
        index++;
        updateScore(total, index, score);
        if (index === total) {
            onInit();
            return;
        }
        generate();
        clearInput();
    };

    const onStart = () => {
        const $main = document.getElementsByTagName("main")[0];
        builder
            .div({ id: TASK }).close()
            .input({ type: "number", pattern: "[0-9]*", inputmode: "numeric" }, { change: onChange});
        replace($main, convert(builder.done()));
        generate();
        clearInput();
    };

    const onInit = () => {
        index = 0;
        score = 0;
        builder
            .button().text("(re)start").onClick(onStart).close();
        replace(document.getElementsByTagName("main")[0], convert(builder.done()));
    };

    builder
        .open("header").span({ id: TOTAL }).close().span({ id: INDEX }).close().span({ id: SCORE }).close(2)
        .open("main").close()
        .open("footer").text("footer").close();

    replace($root, convert(builder.done()));

    updateScore(total, index, score);

    onInit();
});