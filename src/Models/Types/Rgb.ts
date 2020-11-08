import { rgb2hex } from "@fluentui/react";
import { Brightness, Hsb, Hue } from ".";
import { almostEqual, clamp } from "../../Helpers";
import { Color } from "./Color";
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

        const other = color.toRgb();

        let r = gammaBlend(this.red, other.red);
        let g = gammaBlend(this.green, other.green);
        let b = gammaBlend(this.blue, other.blue);

        return new Rgb(r, g, b);

        function gammaBlend(a: number, b: number): number {
            return Math.sqrt((invAmount * a * a) + (amount * b * b));
        }
    }

    public get hue(): Hue {
        const r = this.red;
        const g = this.green;
        const b = this.blue;

        if (r === g && g === b)
            return Hue.RED;

        let hue: number;
        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);
        var delta = max - min;

        if (almostEqual(r, max))
            hue = (g - b) / delta;
        else if (almostEqual(g, max))
            hue = 2 + (b - r) / delta;
        else
            hue = 4 + (r - g) / delta;

        hue *= 60;
        if (hue < 0)
            hue += 360;

        return new Hue(hue);
    }

    public get saturation(): Saturation {
        const r = this.red;
        const g = this.green;
        const b = this.blue;

        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);

        if (almostEqual(min, max) || almostEqual(max, 0))
            return Saturation.MIN;

        return new Saturation(1 - ((1 * min) / max));
    }

    public get brightness(): Brightness {
        const r = this.red;
        const g = this.green;
        const b = this.blue;
        return new Brightness(Math.max(r, g, b));
    }

    public toRgb(): Rgb {
        return this;
    }

    public toHsb(): Hsb {
        return new Hsb(this.hue, this.saturation, this.brightness);
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
    public toState() {
        return this.toHsb().toState();
    }

    public static fromJson(value: string): Rgb {
        const r = parseInt(value.substr(1, 2), 16) / 255;
        const g = parseInt(value.substr(3, 2), 16) / 255;
        const b = parseInt(value.substr(5, 2), 16) / 255;
        return new Rgb(r, g, b);
    }
}

