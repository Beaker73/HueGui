import React from "react";
import { Slider } from "@fluentui/react";

import { Light } from "../Models/Store";
import { Brightness } from "../Models/Types";
import { useStoreActions } from "../Store";

export interface BrightnessSliderProps {
    brightness?: Brightness;
    onBrightnessChanged?(newBrightness: Brightness): void;
    disabled?: boolean;
}

export function BrightnessSlider(props: BrightnessSliderProps): JSX.Element {
    return <Slider disabled={props.disabled}
        value={props.brightness?.value} valueFormat={v => `${Math.round(v * 100)}%`}
        min={0} max={1} step={0.005} onChange={onValueChanged} />;

    function onValueChanged(value: number) {
        if (props.onBrightnessChanged)
            props.onBrightnessChanged(new Brightness(value));
    }
}

export interface LightBrightnessSliderProps {
    light?: Light;
}

export function LightBrightnessSlider(props: LightBrightnessSliderProps): JSX.Element {
    const state = props.light?.state;
    const key = props.light?.key;
    const changeState = useStoreActions(store => store.lights.changeState);

    if(!state?.brightness)
        return <></>;

    return <BrightnessSlider
        disabled={state?.isOn !== true} brightness={state?.brightness}
        onBrightnessChanged={onBrightnessChanged} />;

    function onBrightnessChanged(brightness: Brightness) {
        console.log({key, brightness})
        if (key) {
            changeState({ key, targetState: { brightness } });
        }
    }
}
