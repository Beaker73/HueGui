import { Color, Hsb, Kelvin, Rgb } from "..";

import { hsb2rgb } from "./hsb2rgb";
import { k2rgb } from "./k2rgb";
import { rgb2hsb } from "./rgb2hsb";

export * from "./hsb2rgb";
export * from "./k2rgb";
export * from "./rgb2hsb";

export function toRgb(color: Color): Rgb {
    if (color instanceof Rgb)
        return color;
    if (color instanceof Hsb)
        return hsb2rgb(color);
    if (color instanceof Kelvin)
        return k2rgb(color);

    throw new Error("Conversion not supported");
}

export function toHsb(color: Color): Hsb {
    if (color instanceof Hsb)
        return color;
    if (color instanceof Rgb)
        return rgb2hsb(color);
    if (color instanceof Kelvin)
        return rgb2hsb(k2rgb(color));

    throw new Error("Conversion not supported");
}