import { Builder, Binder, convert, replace } from "fandom";

const randomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

class Mark {
    constructor(a, b, actual, expected) {
        this.a = a;
        this.b = b;
        this.actual = actual;
        this.expected = expected;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const builder = new Builder();

    const $root = document.getElementById("root");

    $root.classList.add("container");

    const TASK = "task";
    const TOTAL = "total";
    const INDEX = "count";
    const SCORE = "score";

    let a = 0;
    let b = 0;

    let total = 10;
    let index = 0;
    let score = 0;

    const min = 1;
    const max = 99;

    let expected = 0;
    let actual = 0;
    let history = [];

    const updateTask = (description) => {
        document.getElementById(TASK).innerText = description;
    };

    const updateTotal = ($total) => {
        $total.innerText = `total: ${total}`;
    };

    const updateIndex = ($index) => {
        $index.innerText = `index: ${index}`;
    };

    const updateScore = ($score) => {
        $score.innerText = `score: ${score}`;
    };

    const totalBinder = new Binder(updateTotal);
    const indexBinder = new Binder(updateIndex);
    const scoreBinder = new Binder(updateScore);

    const updateHeader = () => {
        totalBinder.call();
        indexBinder.call();
        scoreBinder.call();
    };

    const clearInput = () => {
        const input = document.querySelector("input");
        input.value = "";
        input.focus();
    };

    const generate = () => {
        a = randomInt(min, max);
        b = randomInt(min, max);
        expected = a + b;
        updateTask(`${a}+${b}`);
    };

    const onInit = ($main) => {
        index = 0;
        score = 0;
        if (history.length > 0) {
            builder.open("ol");
            for (const mark of history) {
                builder.open("li");
                builder.span().text(mark.a).close();
                builder.span().text(" + ").close();
                builder.span().text(mark.b).close();
                builder.span().text(" = ").close();
                if (mark.actual === mark.expected) {
                    builder.span({ class: "correct" }).text(mark.actual).close();
                } else {
                    builder.span({ class: "wrong" }).text(mark.actual).close();
                    builder.span().text(" (").close();
                    builder.span({ class: "correct" }).text(mark.expected).close();
                    builder.span().text(")").close();
                }
                builder.close();
            }
            builder.close();
        }
        replace($main, convert(builder.done()));
        history = [];
    };

    const initBinder = new Binder(onInit);

    const onStart = ($main) => {
        builder
            .div({ id: TASK }).close()
            .input({ type: "number", pattern: "[0-9]*", inputmode: "numeric" }, { change: onChange });
        replace($main, convert(builder.done()));
        generate();
        clearInput();
    };

    const startBinder = new Binder(onStart);

    const onChange = (e) => {
        actual = parseInt(e.target.value);
        const isCorrect = expected === actual;
        history.push(new Mark(a, b, actual, expected));
        score += isCorrect ? 1 : 0;
        index++;
        updateHeader();
        if (index === total) {
            initBinder.call();
            return;
        }
        generate();
        clearInput();
    };

    builder
        .open("header")
        .span({ id: TOTAL }).bind(totalBinder).close()
        .span({ id: INDEX }).bind(indexBinder).close()
        .span({ id: SCORE }).bind(scoreBinder).close(2)
        .open("main").bind(initBinder).bind(startBinder).close()
        .open("footer").button({ class: "start" }).text("(re)start").onClick(startBinder.call).close(2);

    replace($root, convert(builder.done()));

    updateHeader();

    initBinder.call();
});