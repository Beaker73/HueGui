import React from "react";
import { Blade } from "@beaker73/fluentui-blades";
import { DetailsList } from "@fluentui/react";

import { useGroups } from "../Hooks/Groups";
import { GroupType } from "../Models/Store";

export function RoomsBlade(): JSX.Element {

    const rooms = useGroups(GroupType.Room);

    return <Blade title="Rooms">
        <DetailsList items={Object.values(rooms)}/>
	</Blade>;
}