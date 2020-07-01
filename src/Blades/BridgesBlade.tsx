import React from "react";
import { DetailsList, IColumn, SelectionMode, DefaultButton } from "@fluentui/react";
import { Blade, useBlade } from "@beaker73/fluentui-blades";

import { useBridgeDiscovery, DiscoveredBridge } from "../Hooks/Discover";
import { ConnectBlade } from "./ConnectBlade";

export function BridgesBlade(): JSX.Element {

	const { openBlade } = useBlade();
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
		return bridge.ip;
	}

	function renderConnectButton(bridge: DiscoveredBridge) {
		return <DefaultButton iconProps={{ iconName: "PlugDisconnected" }} onClick={() => openConnectBlade(bridge)}>Connect</DefaultButton>
	}

	function openConnectBlade(bridge: DiscoveredBridge) {
		return openBlade(ConnectBlade, { bridge });
	}
}