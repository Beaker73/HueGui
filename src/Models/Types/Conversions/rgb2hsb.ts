import { Brightness, Hsb, Hue, Rgb, Saturation } from "..";
import { almostEqual } from "../../../Helpers";


export function rgb2hsb(rgb: Rgb): Hsb {

    return new Hsb(getHue(rgb), getSaturation(rgb), getBrightness(rgb));

    function getHue(rgb: Rgb): Hue {
        const r = rgb.red;
        const g = rgb.green;
        const b = rgb.blue;

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

    function getSaturation(rgb: Rgb): Saturation {
        const r = rgb.red;
        const g = rgb.green;
        const b = rgb.blue;

        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);

        if (almostEqual(min, max) || almostEqual(max, 0))
            return Saturation.MIN;

        return new Saturation(1 - ((1 * min) / max));
    }

    function getBrightness(rgb: Rgb): Brightness {
        const r = rgb.red;
        const g = rgb.green;
        const b = rgb.blue;

        return new Brightness(Math.max(r, g, b));
    }
}
