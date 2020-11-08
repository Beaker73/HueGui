import { Hsb } from ".";
import { clamp } from "../../Helpers";
import { Color } from "./Color";
import { Rgb } from "./Rgb";

export type NamedTemperature = [Kelvin, string];

export class Kelvin implements Color {

    public static readonly Candle = new Kelvin(1900);
    public static readonly SodiumVapor = new Kelvin(2200);
    public static readonly Relax = new Kelvin(2237);
    public static readonly Tungsten = new Kelvin(2800);
    public static readonly Read = new Kelvin(2890);
    public static readonly Halogen = new Kelvin(3200);
    public static readonly ClearMetalHalide = new Kelvin(4000);
    public static readonly Concentrate = new Kelvin(4291);
    public static readonly CarbonArc = new Kelvin(5200);
    public static readonly Sunlight = new Kelvin(5500);
    public static readonly Energize = new Kelvin(6410);

    public static readonly KnownTemperatures: readonly NamedTemperature[] = [
        [Kelvin.Candle, "Candle"],
        [Kelvin.SodiumVapor, "Sodium Vapor"],
        [Kelvin.Relax, "Relax"],
        [Kelvin.Tungsten, "Tungsten"],
        [Kelvin.Read, "Read"],
        [Kelvin.Halogen, "Halogen"],
        [Kelvin.ClearMetalHalide, "Clear Metal Halide"],
        [Kelvin.Concentrate, "Concentrate"],
        [Kelvin.CarbonArc, "Carbon Arc"],
        [Kelvin.Sunlight, "Sunlight"],
        [Kelvin.Energize, "Energize"]
    ];

    private _value: number;

    constructor(value: number) {
        this._value = clamp(value, 2000, 6500);
    }

    public get value() {
        return this._value;
    }

    public toRgb(): Rgb {
        return k2rgb(this);
    }
    public toHsb(): Hsb {
        return this.toRgb().toHsb();
    }

    public static fromJson(value: number): Kelvin {
        return new Kelvin(Math.round(1_000_000 / value));
    }

    public toJson(): number {
        return Math.round(1_000_000 / this._value);
    }
    public toState() {
        return ({
            kelvin: this,
        });
    }

    public toCss(): string {
        // no native css for colour temperature
        // so use rgb value instead
        return this.toRgb().toCss();
    }

    public toString(): string {
        return this.value.toString() + " K";
    }

}

// tries all kinds of algorithms for kelvin to rgb conversion
// but because they where made for photography they just didn't match the hue of lights.
// in the end, I just picked the colors as shown in HUE app and 
// used those by mixing them linear against the whitepoint

function k2rgb(kelvin: Kelvin): Rgb {
    const k = kelvin.value;

    if (k < 4300)
        return k2500.mix(k4300, (k - 2500) / 1800);
    if (k > 4300)
        return k4300.mix(k6500, (k - 4300) / 2200);
    return k4300;
}

const k2500 = new Rgb(245 / 255, 219 / 255, 114 / 255); // 2500 geel     245,219,114
// 4300-2500 dist. 1800
const k4300 = new Rgb(1, 1, 1); // 4300 wit      255,255,255
// 6500-4300 dist. 2200
const k6500 = new Rgb(192 / 255, 242 / 255, 252 / 255); // 6500 blauw    192,242,252



