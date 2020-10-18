import { LightState, LightAlert, LightEffect, ColorMode } from "../../Store";
import { Hue, Saturation, Brightness, Kelvin } from "../../Types";

export interface ApiLightState {
    on: boolean;
    bri?: number;
    hue?: number;
    sat?: number;
    xy?: [number, number];
    ct?: number;
    alert?: LightAlert,
    effect?: LightEffect,
    colormode?: ColorMode,
    reachable?: boolean,
}

export const lightStateConverter = {
    toStoreModel: (apiAction: ApiLightState): LightState => {
        return {
            isOn: apiAction.on,
            brightness: apiAction.bri ? Brightness.fromJson(apiAction.bri) : void 0,
            colorMode: apiAction.colormode,
            hue: apiAction.hue ? Hue.fromJson(apiAction.hue) : void 0,
            saturation: apiAction.sat ? Saturation.fromJson(apiAction.sat) : void 0,
            xy: apiAction.xy,
            kelvin: apiAction.ct ? Kelvin.fromJson(apiAction.ct) : void 0,
            alert: apiAction.alert,
            effect: apiAction.effect,
            isReachable: apiAction.reachable,
        };
    },
    toApiModel: (action: Partial<LightState>): Partial<ApiLightState> => {
        const api: Partial<ApiLightState> = {};

        if ("isOn" in action)
            api["on"] = action.isOn;
        if ("brightness" in action)
            api["bri"] = action.brightness?.toJson();
        if ("colorMode" in action)
            api["colormode"] = action.colorMode;
        if ("hue" in action)
            api["hue"] = action.hue?.toJson();
        if ("saturation" in action)
            api["sat"] = action.saturation?.toJson();
        if ("xy" in action)
            api["xy"] = action.xy;
        if ("kelvin" in action)
            api["ct"] = action.kelvin?.toJson();
        if ("alert" in action)
            api["alert"] = action.alert;
        if ("effect" in action)
            api["effect"] = action.effect;

        return api;
    }
}