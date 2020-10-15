import React from "react";
import { Blade } from "@beaker73/fluentui-blades";

import { useRooms } from "../Hooks/Rooms";

export function RoomsBlade(): JSX.Element {

    const rooms = useRooms();

    return <Blade title="Rooms">
	</Blade>;
}