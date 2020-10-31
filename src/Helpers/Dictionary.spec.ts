import { filter, map, filterMap, count, every, some, mapEntries } from "./Dictionary";

test("filter", () => {
    const result = filter({ a: 1, b: 2, c: 3, d: 4 }, i => i % 2 === 0);
    expect(result).toEqual({ b: 2, d: 4 });
});

test("map", () => {
    const result = map({ a: 1, b: 2, c: 3, d: 4 }, i => i * 2);
    expect(result).toEqual({ a: 2, b: 4, c: 6, d: 8 });
});

test("mapEntries", () => {
    const result = mapEntries({ a: 1, b: 2, c: 3, d: 4 }, (k, i) => [k.toUpperCase(), i * 2]);
    expect(result).toEqual({ A: 2, B: 4, C: 6, D: 8 });
});

test("filterMap", () => {
    const result = filterMap({ a: 1, b: 2, c: 3, d: 4 }, i => i % 2 === 0, i => i * 2);
    expect(result).toEqual({ b: 4, d: 8 });
});

test("count", () => {
    const result = count({ a: 1, b: 2, c: 3, d: 4 });
    expect(result).toBe(4);
})

describe("every", () => {
    test("true", () => {
        const result = every({ a: 2, b: 4, c: 6, d: 8 }, i => i % 2 === 0);
        expect(result).toBe(true);
    });
    test("false", () => {
        const result = every({ a: 2, b: 4, c: 6, d: 8 }, i => i % 3 === 0);
        expect(result).toBe(false);
    });
});

describe("some", () => {
    test("true", () => {
        const result = some({ a: 2, b: 4, c: 6, d: 8 }, i => i % 3 === 0);
        expect(result).toBe(true);
    });
    test("false", () => {
        const result = some({ a: 2, b: 4, c: 7, d: 8 }, i => i % 3 === 0);
        expect(result).toBe(false);
    });
})