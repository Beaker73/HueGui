import { Blade } from "@beaker73/fluentui-blades";
import { DefaultButton, getTheme, Label, List, Pivot, PivotItem, PrimaryButton, Slider, Stack, TextField, Toggle } from "@fluentui/react";
import React from "react";
import { LightBrightnessSlider, LightKelvinSlider, LightOnOffToggle } from "../Components";
import { ColorButton } from "../Components/ColorButton";
import { useLight } from "../Hooks";
import { Color, Kelvin, NamedTemperature } from "../Models/Types";
import { useStoreActions } from "../Store";

export interface LightBladeProps {
    lightKey: string;
}

export function LightBlade(props: LightBladeProps): JSX.Element {

    const changeState = useStoreActions(store => store.lights.changeState);

    const light = useLight(props.lightKey);
    const theme = getTheme();

    return <Blade title={light?.name ?? "Light"}>
        <Stack horizontal verticalAlign="start" tokens={{ childrenGap: theme.spacing.m }}>
            <Stack.Item grow={0}>
                <Label>On</Label>
                <LightOnOffToggle light={light} />
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
            <PivotItem headerText="Kelvin">
                <LightKelvinSlider light={light} />
                <Label>Presets</Label>
                <Stack horizontal wrap tokens={{ childrenGap: theme.spacing.s2 }}>
                    {Kelvin.KnownTemperatures.map(renderPreset)}
                </Stack>
            </PivotItem>
        </Pivot>
    </Blade >;

    function renderPreset(item?: NamedTemperature): JSX.Element {
        if (item) {
            return <Stack.Item grow={0} shrink={0}>
                <ColorButton color={item[0]} onClick={() => setColor(item[0])}>
                    {item[1]}
                </ColorButton>
            </Stack.Item>;
        }

        return <></>;
    }

    async function setColor(color: Color) {
        if (light && color) {
            await changeState({ key: light.key, targetState: color.toState() })
        }
    }
}