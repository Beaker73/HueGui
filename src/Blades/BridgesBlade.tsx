import React from "react";
import { DetailsList, IColumn, SelectionMode, DefaultButton, Icon } from "@fluentui/react";
import { Blade, useBlade } from "@beaker73/fluentui-blades";

import { useBridgeDiscovery, DiscoveredBridge } from "../Hooks/Discover";
import { ConnectBlade } from "./ConnectBlade";
import { useStoreState } from "../Store";
import { Dictionary } from "../Helpers";
import { Bridge } from "../Models";

export function BridgesBlade(): JSX.Element {

	const { openBlade } = useBlade();

	const knownBridges = useStoreState(state => state.bridges.all);
	const { bridges } = useBridgeDiscovery();

	const mergedBridges: Dictionary<Bridge | DiscoveredBridge> = { ...knownBridges };
	for (const bridge of bridges) {
		if (!(bridge.id in mergedBridges)) {
			// not in list, add
			mergedBridges[bridge.id] = bridge;
		}
	}
	const bridgeList = Object.values(mergedBridges);

	const columns: IColumn[] = [
		{ key: "address", name: "Address", fieldName: "ip", minWidth: 60, onRender: renderAddress },
		{ key: "name", name: "Name", fieldName: "name", minWidth: 120, isRowHeader: true },
		{ key: "connect", name: "Connection", minWidth: 100, onRender: renderState }
	]

	return <Blade title="Discovered Bridges">
		<DetailsList columns={columns} items={bridgeList} selectionMode={SelectionMode.none} />
	</Blade>;

	function renderAddress(bridge: Bridge | DiscoveredBridge) {
		return bridge.ip;
	}

	function renderState(bridge: Bridge | DiscoveredBridge) {
		if (isConnected(bridge))
			return <><Icon iconName="PlugConnected" /> Connected</ >;
		else
			return <DefaultButton iconProps={{ iconName: "PlugDisconnected" }} onClick={() => openConnectBlade(bridge)}>Connect</DefaultButton>;
	}

	function openConnectBlade(bridge: DiscoveredBridge) {
		return openBlade(ConnectBlade, { bridge });
	}
}

function isConnected(bridge: Bridge | DiscoveredBridge): bridge is Bridge {
	return !!((bridge as Bridge).userName);
}