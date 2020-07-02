import React from "react";
import { CommandBar, ICommandBarItemProps, ContextualMenuItemType, Text, Stack } from "@fluentui/react";
import { useBlade } from "@beaker73/fluentui-blades";
import { BridgesBlade } from "../Blades/BridgesBlade";

export function Menu(): JSX.Element {

	const { openBlade } = useBlade();

	const items: ICommandBarItemProps[] = [
		{ key: "title", name: "HueGui", itemType: ContextualMenuItemType.Header, onRender: renderTitle }
	];

	const farItems: ICommandBarItemProps[] = [
		{ key: "bridges", name: "Bridges", iconProps: { iconName: "Bridge" }, onClick: openBridgesBlade },
		{ key: "settings", iconOnly: true, iconProps: { iconName: "Settings" } },
	];

	return <CommandBar items={items} farItems={farItems} />

	function openBridgesBlade() {
		openBlade(BridgesBlade);
	}

	function renderTitle() {
		return <Stack verticalFill verticalAlign="center">
			<Text variant="xLargePlus">HueGui</Text>
		</Stack>;
	}
}