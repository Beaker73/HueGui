import { rgb2hex } from "@fluentui/react";
import { Brightness, Hsb, Hue } from ".";
import { almostEqual, clamp } from "../../Helpers";
import { Color } from "./Color";
import { toHsb, toRgb } from "./Conversions";
import { Saturation } from "./Saturation";

/**
 * RGB value where R, G and B are between 0 and 1
 */
export class Rgb implements Color {

    private value: [number, number, number] = [0, 0, 0];

    constructor(red: number, green: number, blue: number) {
        this.value = [clamp(red, 0, 1), clamp(green, 0, 1), clamp(blue, 0, 1)];
    }

    public get red(): number { return this.value[0]; }
    public get green(): number { return this.value[1]; }
    public get blue(): number { return this.value[2]; }

    public mix(color: Color, amount: number = 0.5) {
        amount = clamp(amount, 0, 1);
        const invAmount = 1 - amount;

        const other = toRgb(color);

        let r = gammaBlend(this.red, other.red);
        let g = gammaBlend(this.green, other.green);
        let b = gammaBlend(this.blue, other.blue);

        return new Rgb(r, g, b);

        function gammaBlend(a: number, b: number): number {
            return Math.sqrt((invAmount * a * a) + (amount * b * b));
        }
    }

    public toCss(): string {
        return "#" + rgb2hex(
            Math.floor(this.red * 255),
            Math.floor(this.green * 255),
            Math.floor(this.blue * 255)
        );
    }

    public toJson() {
        return this.toCss();
    }
    public toState(): any {
        return toHsb(this).toState();
    }

    public static fromJson(value: string): Rgb {
        const r = parseInt(value.substr(1, 2), 16) / 255;
        const g = parseInt(value.substr(3, 2), 16) / 255;
        const b = parseInt(value.substr(5, 2), 16) / 255;
        return new Rgb(r, g, b);
    }
}

