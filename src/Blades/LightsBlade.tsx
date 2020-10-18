import React from "react";
import { Blade, useBlade } from "@beaker73/fluentui-blades";
import { useSpecificLights } from "../Hooks";
import { DetailsList, IColumn, SelectionMode, Slider, Toggle } from "@fluentui/react";
import { Light } from "../Models";
import { LightBlade } from "./LightBlade";
import { useStoreActions } from "../Store";

export interface LightsBladeProps {
    title?: string;
    lightKeys?: string[];
}

export function LightsBlade(props: LightsBladeProps): JSX.Element {

    const lights = useSpecificLights(props.lightKeys ?? []);

    const blade = useBlade();
    const changeState = useStoreActions(store => store.lights.changeState);

    const columns: IColumn[] = [
        { key: "state", name: "On", fieldName: "isOn", minWidth: 30, onRender: renderState },
        { key: "name", name: "Name", fieldName: "name", minWidth: 120 },
        { key: "brightness", name: "Brightness", fieldName: "brightness", minWidth: 150, onRender: renderSlider },
    ];

    return <Blade title={props?.title ?? "Lights"}>
        <DetailsList items={Object.values(lights)} columns={columns}
            selectionMode={SelectionMode.none} onItemInvoked={openLight}
            compact />
    </Blade>;

    function renderState(item: Light) {
        return <Toggle checked={item.state.isOn} onClick={() => toggleLightOnOff(item)} />;
    }

    function renderSlider(item: Light) {
        if (!item.state.brightness)
            return void 0;
        return <Slider disabled={item.state.isOn !== true} value={item.state.brightness.value} min={0} max={1} step={0.005} valueFormat={v => `${Math.round(v * 100)}%`} />
    }

    function openLight(item: Light) {
        blade.openBlade(LightBlade, { lightKey: item.key });
    }

    function toggleLightOnOff(light: Light) {
        changeState({
            key: light.key,
            targetState: {
                isOn: !light.state.isOn
            }
        });
    }
}