import React from "react";
import { DetailsList, IColumn, SelectionMode, DefaultButton } from "@fluentui/react";
import { Blade } from "@beaker73/fluentui-blades";

import { useBridgeDiscovery, DiscoveredBridge } from "../Hooks/Discover";

export function BridgesBlade(): JSX.Element {

	const { bridges } = useBridgeDiscovery();

	const columns: IColumn[] = [
		{ key: "address", name: "Address", fieldName: "ip", minWidth: 60, onRender: renderAddress },
		{ key: "name", name: "Name", fieldName: "name", minWidth: 120, isRowHeader: true },
		{ key: "connect", name: "Connection", minWidth: 100, onRender: renderConnectButton }
	]

	return <Blade title="Discovered Bridges">
		<DetailsList columns={columns} items={bridges} selectionMode={SelectionMode.none} />
	</Blade>;

	function renderAddress(bridge: DiscoveredBridge) {
		return bridge.ip.address;
	}

	function renderConnectButton(bridge: DiscoveredBridge) {
		return <DefaultButton iconProps={{ iconName: "PlugDisconnected" }}>Connect</DefaultButton>
	}
}