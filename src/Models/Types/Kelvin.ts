import { Hsb } from ".";
import { clamp } from "../../Helpers";
import { Color } from "./Color";
import { k2rgb, toRgb } from "./Conversions";
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
        return toRgb(this).toCss();
    }

    public toString(): string {
        return this.value.toString() + " K";
    }

}




