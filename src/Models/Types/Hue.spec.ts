import { Hue } from "./Hue"

describe("hue", () => {
    describe("fromJson", () => {

        test("maxValue", () => {
            const result = Hue.fromJson(65535);
            expect(result.value).toBe(360);
        });

        test("toLarge", () => {
            const result = Hue.fromJson(10000000);
            expect(result.value).toBe(360);
        });

        test("minValue", () => {
            const result = Hue.fromJson(0);
            expect(result.value).toBe(0);
        });

        test("toSmall", () => {
            const result = Hue.fromJson(-100000);
            expect(result.value).toBe(0);
        });

    });

    describe("toJson", () => {

        test("maxVaue", () => {
            const result = new Hue(360).toJson();
            expect(result).toBe(65535);
        })

        test("minValue", () => {
            const result = new Hue(0).toJson();
            expect(result).toBe(0);
        })

    });
});