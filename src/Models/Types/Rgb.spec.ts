import { Rgb } from "./Rgb";

describe("Rgb", () => {
    test("toJson", () => {
        const result = new Rgb(1, 0.5, 0).toJson();
        expect(result).toBe("#ff7f00");
    });
    test("fromJson", () => {
        const result = Rgb.fromJson("#ff7f00");
        expect(result.red).toBe(1);
        expect(result.green).toBeCloseTo(0.5, 2);
        expect(result.blue).toBe(0);
    });
});