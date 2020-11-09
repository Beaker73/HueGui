import { LightState } from "../Store";
import { Rgb } from "./Rgb";

export interface Color {
    
    // Every Color object should be convertable to a display text
    toString(): string;

    // Every Color object should be convertable from and to JSON for persistence
    // static fromJson(jsonObj: any): void;
    toJson(): any;

    // Every color object should be convertable to a light state
    toState(): Partial<LightState>;

    // Every Color object should be convertable to CSS style
    // if there is no default CSS way to express the value
    // conversion to a supported value is allowed (RGB, HSL etc.)
    toCss(): string;

}
