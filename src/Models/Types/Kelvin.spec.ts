import { Kelvin } from "./Kelvin"

describe("kelvin", () => {
    describe("fromJson", () => {

        test("cool light", () => {
            const result = Kelvin.fromJson(153);
            expect(result.value).toBe(6500);
        });

        test("warm light", () => {
            const result = Kelvin.fromJson(500);
            expect(result.value).toBe(2000);
        });

        test("sky", () => {
            const result = Kelvin.fromJson(40);
            expect(result.value).toBe(6500);
        })

    });

    describe("toJson", () => {

        test("cool light", () => {
            const result = new Kelvin(6500).toJson();
            expect(result).toBe(154);
        })

        test("warm light", () => {
            const result = new Kelvin(2000).toJson();
            expect(result).toBe(500);
        })

    });

    // // based on: https://tannerhelland.com/2012/09/18/convert-temperature-rgb-algorithm-code.html'
    // // took literal formulas from site
    // // created test to match the results from those formulas
    // // converted formulas to new range (0-1) instead of (0-255)
    // describe("rgb", () => {
    //     test("Candle", () => expect(Kelvin.Candle.toHex()).toBe("#ff9329"));
    //     test("Incandescent", () => expect(Kelvin.Tungsten.toHex()).toBe("#ffc58f"));
    //     test("Halogen", () => expect(Kelvin.Halogen.toHex()).toBe("#fff1e0"));
    //     test("CarbonArc", () => expect(Kelvin.CarbonArc.toHex()).toBe("#fffaf4"));
    //     test("DirectSunlight", () => expect(Kelvin.DirectSunlight.toHex()).toBe("#ffffff"));
    //     test("OvercastSky", () => expect(Kelvin.OvercastSky.toHex()).toBe("#c9e2ff"));
    // });
});