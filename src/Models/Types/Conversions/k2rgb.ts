import { Color, Kelvin, Rgb } from "..";


// tried all kinds of algorithms for kelvin to rgb conversion
// but because they where made for photography they just didn't match the hue of lights.
// in the end, I just picked the colors as shown in HUE app and 
// used those by mixing them linear against the whitepoint

export function k2rgb(kelvin: Kelvin): Rgb {
    const k = kelvin.value;

    const k2500 = new Rgb(245 / 255, 219 / 255, 114 / 255); // 2500 geel     245,219,114
    // 4300-2500 dist. 1800
    const k4300 = new Rgb(1, 1, 1); // 4300 wit      255,255,255
    // 6500-4300 dist. 2200
    const k6500 = new Rgb(192 / 255, 242 / 255, 252 / 255); // 6500 blauw    192,242,252

    if (k < 4300)
        return k2500.mix(k4300, (k - 2500) / 1800);
    if (k > 4300)
        return k4300.mix(k6500, (k - 4300) / 2200);
    return k4300;
}
