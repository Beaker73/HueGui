import { clamp } from "../../Helpers/Math";

/**
 * Hue in degerees from 0 to 360
 */
export class Hue {

    private _value: number;

    constructor(value: number) {
        this._value = clamp(value, 0, 360);
    }

    public get value(): number { return this._value; }

    public static fromJson(value: number): Hue {
        value = clamp(value, 0, 65535);
        return new Hue(value * 360 / 65535);
    }

    public toJson(): number {
        return clamp(this._value * 65535 / 360, 0, 65535);
    }
}
