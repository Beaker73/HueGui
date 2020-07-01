import React from "react";
import { PrimaryButton } from "@fluentui/react";
import { Blade, useBlade } from "@beaker73/fluentui-blades";

import { BridgesBlade } from "./BridgesBlade";

export function RootBlade(): JSX.Element {

	const { openBlade } = useBlade();

	return <Blade title="HueGui - The Gui for Hue">
		<PrimaryButton iconProps={{iconName: "Bridge"}} onClick={openConnectBlade}>Bridges...</PrimaryButton>
	</Blade>;

	function openConnectBlade() {
		openBlade(BridgesBlade);
	}
}