import { Blade } from "@beaker73/fluentui-blades";
import { getTheme, Label, Pivot, PivotItem, Slider, Stack, TextField, Toggle } from "@fluentui/react";
import React from "react";
import { LightBrightnessSlider } from "../Components";
import { useLight } from "../Hooks";

export interface LightBladeProps {
    lightKey: string;
}

export function LightBlade(props: LightBladeProps): JSX.Element {

    const light = useLight(props.lightKey);
    const theme = getTheme();

    return <Blade title={light?.name ?? "Light"}>
        <Stack horizontal verticalAlign="start" tokens={{ childrenGap: theme.spacing.m }}>
            <Stack.Item grow={0}>
                <Label>On</Label>
                <Toggle checked={light?.state.isOn ?? false} />
            </Stack.Item>
            <Stack.Item grow={1}>
                <Label>Name</Label>
                <TextField value={light?.name} />
            </Stack.Item>
        </Stack>
        {!light?.state.brightness ? void 0 : <>
            <Label>Brightness</Label>
            <LightBrightnessSlider light={light} />
        </>}
        <Label>Color</Label>
        <Pivot>
            <PivotItem headerText="Hue"></PivotItem>
            <PivotItem headerText="Kelvin"></PivotItem>
        </Pivot>
    </Blade >;
}