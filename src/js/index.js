import { Builder, convert, replace } from "fandom";

document.addEventListener("DOMContentLoaded", function () {
    const builder = new Builder();

    const $root = document.getElementById("root");

    $root.classList.add("container");

    builder.open("header").text("header").close();
    builder.open("main").text("main").close();
    builder.open("footer").text("footer").close();

    replace($root, convert(builder.done()));
});