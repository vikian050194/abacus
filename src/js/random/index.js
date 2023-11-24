export * from "./sfc32";
export * from "./mulberry32";
export * from "./xoshiro128ss";
export * from "./jsf32";

export const buildRandomInt = (random) => (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(random() * (max - min + 1)) + min;
};
