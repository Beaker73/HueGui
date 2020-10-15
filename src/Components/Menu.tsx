import React, { useMemo } from "react";
import { CommandBar, ICommandBarItemProps, ContextualMenuItemType, Text, Stack, mergeStyleSets, getTheme } from "@fluentui/react";
import { useBlade } from "@beaker73/fluentui-blades";

import { BridgesBlade } from "../Blades/BridgesBlade";
import { RoomsBlade } from "../Blades/RoomsBlade";
import { LightsBlade } from "../Blades/LightsBlade";

export function Menu(): JSX.Element {

	const theme = getTheme();
	const style = useMemo(getStyle, [theme]);

	const { openBlade } = useBlade();

	const items: ICommandBarItemProps[] = [
		{ key: "title", name: "HueGui", itemType: ContextualMenuItemType.Header, onRender: renderTitle },
		{ key: "rooms", name: "Rooms", iconProps: { iconName: "Room" }, onClick: openRoomsBlade },
		{ key: "lights", name: "Lights", iconProps: { iconName: "Light" }, onClick: openLightsBlade },
	];

	const farItems: ICommandBarItemProps[] = [
		{ key: "bridges", name: "Bridges", iconProps: { iconName: "Bridge" }, onClick: openBridgesBlade },
		{ key: "settings", iconOnly: true, iconProps: { iconName: "Settings" } },
	];

	return <CommandBar items={items} farItems={farItems} />

	function openBridgesBlade() {
		openBlade(BridgesBlade);
	}
	function openRoomsBlade() {
		openBlade(RoomsBlade);
	}
	function openLightsBlade() {
		openBlade(LightsBlade);
	}

	function renderTitle() {
		return <Stack verticalFill verticalAlign="center">
			<Text variant="xLargePlus" className={style.title}>HueGui</Text>
		</Stack>;
	}

	function getStyle() {
		return mergeStyleSets({
			title: {
				marginRight: theme.spacing.m,
				marginTop: -5,
			}
		});
	}
}