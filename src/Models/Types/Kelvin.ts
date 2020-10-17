export class Kelvin {

    private _value: number;

    constructor(value: number) {
        this._value = value;
    }

    public get value() {
        return this._value;
    }

    public static fromJson(value: number): Kelvin {
        return new Kelvin(Math.round(1_000_000 / value));
    }

    public toJson(): number {
        return Math.round(1_000_000 / this._value);
    }

}