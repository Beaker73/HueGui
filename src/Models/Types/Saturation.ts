import { clamp } from "../../Helpers/Math"

export class Saturation {

    private _value: number;

    constructor(value: number) {
        this._value = clamp(value, 0, 1);
    }

    public static fromJson(value: number): Saturation {
        return new Saturation(clamp(value, 0, 254) / 254);
    }

    public toJson(): number {
        return clamp(this._value * 254, 0, 254);
    }
}