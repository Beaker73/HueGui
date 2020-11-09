import { Hue, Saturation, Brightness } from ".";
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
