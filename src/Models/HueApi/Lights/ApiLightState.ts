import { ModelConverter } from "../../ModelConverter";
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

export const lightStateConverter: ModelConverter<ApiLightState, LightState> = {
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
    toApiModel: (action: LightState): ApiLightState => {
        return {
            on: action.isOn,
            bri: action.brightness?.toJson(),
            colormode: action.colorMode,
            hue: action.hue?.toJson(),
            sat: action.saturation?.toJson(),
            xy: action.xy,
            ct: action.kelvin?.toJson(),
            alert: action.alert,
            effect: action.effect,
        };
    }
}