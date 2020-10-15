import { clamp } from "../../Helpers/Math"

export class Brightness {

    private _value: number;

    constructor(value: number) {
        this._value = clamp(value, 0, 1);
    }

    public static fromJson(value: number): Brightness {
        return new Brightness(clamp(value, 1, 254) / 254);
    }

    public toJson(): number {
        return clamp(this._value * 254, 1, 254);
    }
}