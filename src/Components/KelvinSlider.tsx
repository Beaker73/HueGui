import React, { useMemo } from "react";
import { createTheme, Customizer, ISettings, ITheme, Slider } from "@fluentui/react";

import { Light } from "../Models/Store";
import { Kelvin } from "../Models/Types";
import { useLight } from "../Hooks";
import { useStoreActions, useStoreState } from "../Store";

export interface KelvinSliderProps {
    kelvin?: Kelvin;
    onKelvinChanged?(newKelvin: Kelvin): void;
    disabled?: boolean;
}

export function KelvinSlider(props: KelvinSliderProps): JSX.Element {

    return <Slider disabled={props.disabled}
        value={props.kelvin?.value} valueFormat={v => `${v} K`}
        min={2000} max={6500} step={1} onChange={onValueChanged} />;

    function onValueChanged(value: number) {
        if (props.onKelvinChanged)
            props.onKelvinChanged(new Kelvin(value));
    }
}

export interface LightKelvinSliderProps {
    light?: Light;
}

export function LightKelvinSlider(props: LightKelvinSliderProps): JSX.Element {
    const state = props.light?.state;
    const key = props.light?.key;
    const changeState = useStoreActions(store => store.lights.changeState);

    if (!state?.kelvin)
        return <></>;

    return <KelvinSlider
        disabled={state?.isOn !== true} kelvin={state?.kelvin}
        onKelvinChanged={onKelvinChanged} />;

    function onKelvinChanged(kelvin: Kelvin) {
        console.log({ key, kelvin })
        if (key) {
            changeState({ key, targetState: { kelvin } });
        }
    }
}
