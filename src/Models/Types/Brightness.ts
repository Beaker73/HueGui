import { clamp } from "../../Helpers/Math"

export class Brightness {

    public static readonly MIN: Brightness = Object.freeze(new Brightness(0)) as Brightness;
    public static readonly MAX: Brightness = Object.freeze(new Brightness(1)) as Brightness;

    private _value: number;

    constructor(value: number) {
        this._value = clamp(value, 0, 1);
    }

    public get value(): number {
        return this._value;
    }

    public adjust(adjust: number): Brightness {
        return new Brightness(clamp(this._value * adjust, 0, 1));
    }

    public static fromJson(value: number): Brightness {
        return new Brightness(clamp(value, 1, 254) / 254);
    }

    public toJson(): number {
        return Math.round(clamp(this._value * 254, 1, 254));
    }
}