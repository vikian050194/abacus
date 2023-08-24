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
    const SCORE = "score";

    const min = 1;
    const max = 99;

    let expected = 0;
    let actual = 0;
    let score = 0;
    let total = 0;

    const updateTask = (description) => {
        document.getElementById(TASK).innerText = description;
    };

    const updateScore = (score, total) => {
        document.getElementById(SCORE).innerText = `${score}/${total}`;
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
        total++;
        updateScore(score, total);
        generate();
        clearInput();
    };

    builder
        .open("header").span().text("abacus").close().span({id: SCORE}).close().close()
        .open("main")
        .div({ id: TASK }).close()
        .input({ type: "number", pattern: "[0-9]*", inputmode: "numeric" }).onChange(onChange)
        .close()
        .open("footer").text("footer").close();

    replace($root, convert(builder.done()));

    generate();
    updateScore(score, total);
    clearInput();
});