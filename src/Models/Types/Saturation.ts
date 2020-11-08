import { clamp } from "../../Helpers/Math"

export class Saturation {

    public static readonly MIN: Saturation = Object.freeze(new Saturation(0)) as Saturation;
    public static readonly MAX: Saturation = Object.freeze(new Saturation(1)) as Saturation;

    private _value: number;

    constructor(value: number) {
        this._value = clamp(value, 0, 1);
    }

    public get value(): number { 
        return this._value;
    }

    public adjust(adjust: number): Saturation {
        return new Saturation(clamp(this._value * adjust, 0, 1));
    }

    public static fromJson(value: number): Saturation {
        return new Saturation(clamp(value, 0, 254) / 254);
    }

    public toJson(): number {
        return clamp(this._value * 254, 0, 254);
    }
}