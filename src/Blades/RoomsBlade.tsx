import React from "react";
import { Blade, useBlade } from "@beaker73/fluentui-blades";
import { DetailsList, IColumn, SelectionMode, Toggle } from "@fluentui/react";

import { useGroups } from "../Hooks/Groups";
import { Group, GroupType } from "../Models/Store";
import { LightsBlade } from "./LightsBlade";

export function RoomsBlade(): JSX.Element {

    const rooms = useGroups(GroupType.Room);
    const blade = useBlade();

    const columns: IColumn[] = [
        { key: "state", name: "On", fieldName: "isOn", minWidth: 50, onRender: renderState },
        { key: "name", name: "Name", fieldName: "name", minWidth: 150 },
        { key: "lights", name: "Lights", minWidth: 50, onRender: (r: Group) => (<>{r.lightKeys.length}</>) },
    ]

    return <Blade title="Rooms">
        <DetailsList items={Object.values(rooms)} columns={columns} selectionMode={SelectionMode.none}
            onItemInvoked={item => openLightsForGroup(item)} compact
        />
    </Blade>;

    function renderState(item: Group) {
        return <Toggle checked={item.state.isAnyOn} />;
    }

    function openLightsForGroup(item: Group) {
        blade.openBlade(LightsBlade, { title: `Lights in ${item.name}`, lightKeys: item.lightKeys });
    }
}