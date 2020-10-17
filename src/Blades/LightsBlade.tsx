import React from "react";
import { Blade } from "@beaker73/fluentui-blades";
import { useSpecificLights } from "../Hooks";
import { DetailsList, IColumn, SelectionMode, Slider, Toggle } from "@fluentui/react";
import { Light } from "../Models";

export interface LightsBladeProps {
    lightIds?: number[];
}

export function LightsBlade(props: LightsBladeProps): JSX.Element {

    const lights = useSpecificLights(props.lightIds ?? []);

    const columns: IColumn[] = [
        { key: "state", name: "On", fieldName: "isOn", minWidth: 30, onRender: renderState },
        { key: "name", name: "Name", fieldName: "name", minWidth: 120 },
        { key: "brightness", name: "Brightness", fieldName: "brightness", minWidth: 150, onRender: renderSlider },
    ];

    return <Blade title={`Lights`}>
        <DetailsList items={Object.values(lights)} columns={columns} selectionMode={SelectionMode.none} compact />
    </Blade>;

    function renderState(item: Light) {
        return <Toggle checked={item.state.isOn} />;
    }

    function renderSlider(item: Light) {
        if(!item.state.brightness)
            return void 0;
        return <Slider disabled={item.state.isOn !== true} value={item.state.brightness.value} min={0} max={1} step={0.005} valueFormat={v => `${Math.round(v * 100)}%`} />
    }
}