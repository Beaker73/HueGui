import { Kelvin } from "./Kelvin"

describe("kelving", () => {
    describe("fromJson", () => {

        test("cool light", () => {
            const result = Kelvin.fromJson(153);
            expect(result.value).toBe(6536);
        });

        test("warm light", () => {
            const result = Kelvin.fromJson(500);
            expect(result.value).toBe(2000);
        });

        test("sky",  () => {
            const result = Kelvin.fromJson(40);
            expect(result.value).toBe(25000);
        })

    });

    describe("toJson", () => {

        test("cool light", () => {
            const result = new Kelvin(6536).toJson();
            expect(result).toBe(153);
        })

        test("warm light", () => {
            const result = new Kelvin(2000).toJson();
            expect(result).toBe(500);
        })

    });
});