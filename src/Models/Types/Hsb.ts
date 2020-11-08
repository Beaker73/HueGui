import { Hue, Saturation, Brightness, Rgb } from ".";
import { Color } from "./Color";


export class Hsb implements Color {

    private value: [Hue, Saturation, Brightness] = [Hue.RED, Saturation.MIN, Brightness.MAX];

    constructor(hue: Hue | number, saturation: Saturation | number, brightness: Brightness | number) {
        if (typeof hue === "number")
            hue = new Hue(hue);
        if (typeof saturation === "number")
            saturation = new Saturation(saturation);
        if (typeof brightness === "number")
            brightness = new Brightness(brightness);

        this.value = [hue, saturation, brightness];
    }

    public get hue(): Hue { return this.value[0] }
    public get saturation(): Saturation { return this.value[1]; }
    public get brightness(): Brightness { return this.value[2]; }

    public setHue(newHue: Hue) {
        return new Hsb(newHue, this.value[1], this.value[2]);
    }
    public setSaturation(newSaturation: Saturation) {
        return new Hsb(this.value[0], newSaturation, this.value[2]);
    }
    public setBrightness(newBrightness: Brightness) {
        return new Hsb(this.value[0], this.value[1], newBrightness);
    }

    public adjustHue(adjust: number) {
        return this.setHue(this.hue.adjust(adjust));
    }
    public adjustSaturation(adjust: number) {
        return this.setSaturation(this.saturation.adjust(adjust))
    }
    public adjustBrightness(adjust: number) {
        return this.setBrightness(this.brightness.adjust(adjust))
    }


    public toRgb(): Rgb {

        const hue = this.hue.value;
        const saturation = this.saturation.value;
        const brightness = this.brightness.value;

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

        if (r < 0) r = 0;
        if (g < 0) g = 0;
        if (b < 0) b = 0;

        return new Rgb(r, g, b);
    }

    public toJson() {
        return {
            hue: this.hue.toJson(),
            sat: this.saturation.toJson(),
            bri: this.brightness.toJson(),
        };
    }
    public toState() {
        return {
            hue: this.hue,
            saturation: this.saturation,
            brightness: this.brightness,
        };
    }

    public toCss(): string {

        // found on: https://stackoverflow.com/questions/3423214/convert-hsb-hsv-color-to-hsl

        let h = this.hue.value;
        let s = this.saturation.value;
        let b = this.brightness.value;

        let l = (2 - s) * b / 2;
        if (l !== 0) {
            if (l === 1)
                s = 0;
            else if (l < 0.5)
                s = s * b / (l * 2);
            else
                s = s * b / (2 - l * 2);
        }

        return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    }
}
