import { Hue, Saturation, Brightness, Kelvin, XY } from "../../Types";
import { ColourMode } from "./ColourMode";
import { LightAlert } from "./LightAlert";
import { LightEffect } from "./LightEffect";

export interface LightActionBase {
    isOn: boolean;
    brightness: Brightness;
    alert: LightAlert,
    effect: LightEffect,
}

export interface LightActionHueMode extends LightActionBase {
    colourMode: ColourMode.HueSaturation;
    hue: Hue;
    saturation: Saturation;
}

export interface LightActionXyMode extends LightActionBase {
    colourMode: ColourMode.XY;
    xy: XY;
}

export interface LightActionKelvinMode extends LightActionBase {
    colourMode: ColourMode.Kelvin;
    kelvin: Kelvin;
}

export type LightAction = LightActionHueMode | LightActionXyMode | LightActionKelvinMode;
