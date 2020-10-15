import { ModelConverter } from "../../ModelConverter";
import { LightAction, LightAlert, LightEffect } from "../../Store";
import { ColourMode } from "../../Store/Lights/ColourMode";
import { Hue, Saturation, Brightness, Kelvin } from "../../Types";

export interface ApiLightAction {
    on: boolean;
    bri: number;
    hue: number;
    sat: number;
    xy: [number, number];
    ct: number;
    alert: LightAlert,
    effect: LightEffect,
    colormode: ColourMode,
}

export const lightActionConverter: ModelConverter<ApiLightAction, LightAction> = {
    toStoreModel: (apiAction: ApiLightAction): LightAction => {
        return {
            isOn: apiAction.on,
            brightness: Brightness.fromJson(apiAction.bri),
            colourMode: apiAction.colormode,
            hue: Hue.fromJson(apiAction.hue),
            saturation: Saturation.fromJson(apiAction.sat),
            xy: apiAction.xy,
            kelvin: Kelvin.fromJson(apiAction.ct),
            alert: apiAction.alert,
            effect: apiAction.effect,
        };
    },
    toApiModel: (action: LightAction): ApiLightAction => {
        const api: Partial<ApiLightAction> = {
            on: action.isOn,
            bri: action.brightness.toJson(),
            colormode: action.colourMode,
            alert: action.alert,
            effect: action.effect,
        };

        if (action.colourMode === ColourMode.HueSaturation) {
            api.hue = action.hue.toJson();
            api.sat = action.saturation.toJson();
        }
        else if (action.colourMode === ColourMode.XY) {
            api.xy = action.xy;
        }
        else if (action.colourMode === ColourMode.Kelvin) {
            api.ct = action.kelvin.toJson();
        }

        return api as ApiLightAction;
    }
}