import { Hsb, Rgb } from "..";


export function hsb2rgb(hsb: Hsb): Rgb {

    const hue = hsb.hue.value;
    const saturation = hsb.saturation.value;
    const brightness = hsb.brightness.value;

    let r: number = 0, g: number = 0, b: number = 0;

    if (saturation === 0) {
        r = g = b = brightness;
    } else {
        const sectorPos = hue / 60;
        const sector = Math.floor(sectorPos);
        const offset = sectorPos - sector;

        const p = brightness * (1 - saturation);
        const q = brightness * (1 - (saturation * offset));
        const t = brightness * (1 - (saturation * (1 - offset)));

        switch (sector) {
            case 0: r = brightness; g = t; b = p; break;
            case 1: r = q; g = brightness; b = p; break;
            case 2: r = p; g = brightness; b = t; break;
            case 3: r = p; g = q; b = brightness; break;
            case 4: r = t; g = p; b = brightness; break;
            case 5: r = brightness; g = p; b = q; break;
        }
    }

    if (r < 0)
        r = 0;
    if (g < 0)
        g = 0;
    if (b < 0)
        b = 0;

    return new Rgb(r, g, b);
}
