import { Hue, Saturation, Brightness, Kelvin, XY } from "../../Types";
import { ColorMode } from "./ColorMode";
import { LightAlert } from "./LightAlert";
import { LightEffect } from "./LightEffect";

export interface LightState {
    isOn: boolean;
    brightness?: Brightness;
    colorMode?: ColorMode;
    hue?: Hue;
    saturation?: Saturation;
    xy?: XY;
    kelvin?: Kelvin;
    alert?: LightAlert;
    effect?: LightEffect;
    isReachable?: boolean;
}
