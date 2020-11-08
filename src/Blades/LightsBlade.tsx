import React from "react";
import { DetailsList, IColumn, List, SelectionMode } from "@fluentui/react";
import { Blade, useBlade } from "@beaker73/fluentui-blades";

import { useSpecificLights } from "../Hooks";
import { Light } from "../Models";
import { LightBlade } from "./LightBlade";
import { LightBrightnessSlider, LightOnOffToggle } from "../Components";
import { Kelvin } from "../Models/Types";

export interface LightsBladeProps {
    title?: string;
    lightKeys?: string[];
}

export function LightsBlade(props: LightsBladeProps): JSX.Element {

    const lights = useSpecificLights(props.lightKeys ?? []);
    const blade = useBlade();

    const columns: IColumn[] = [
        { key: "state", name: "On", fieldName: "isOn", minWidth: 30, onRender: renderState },
        { key: "name", name: "Name", fieldName: "name", minWidth: 120, isRowHeader: true },
        { key: "brightness", name: "Brightness", fieldName: "brightness", minWidth: 150, onRender: renderSlider },
    ];

    const items = Array.from(Kelvin.KnownTemperatures);

    return <Blade title={props?.title ?? "Lights"}>
        <DetailsList items={Object.values(lights)} columns={columns}
            selectionMode={SelectionMode.none} onItemInvoked={openLight} />
    </Blade>;

    function renderState(item: Light) {
        return <LightOnOffToggle light={item} />;
    }

    function renderSlider(item: Light) {
        return <LightBrightnessSlider light={item} />
    }

    function openLight(item: Light) {
        blade.openBlade(LightBlade, { lightKey: item.key });
    }
}