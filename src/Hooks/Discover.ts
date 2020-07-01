import { gretch } from "gretchen";
import { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "../Store";

export interface DiscoveredBridge {
	id: string;
	name: string;
	ip: string;
	mac: string;
	modelid: string;
}

export interface DiscoveredBridges {
	bridges: DiscoveredBridge[];
}

interface HueBridgeResponse {
	id: string;
	internalipaddress: string;
}

interface HueConfigurationResponse {
	"name": string;
	"datastoreversion": string;
	"swversion": string;
	"apiversion": string;
	"mac": string;
	"bridgeid": string;
	"factorynew": boolean;
	"replacesbridgeid": string;
	"modelid": string;
	"starterkitid": string;
}

export function useBridgeDiscovery(): DiscoveredBridges {

	const [bridges, setBridges] = useState<DiscoveredBridge[]>([]);

	useEffect(() => {
		gretch<HueBridgeResponse[]>("https://discovery.meethue.com/")
			.json()
			.then(response => {
				if (response.status === 200 && response.data && Array.isArray(response.data)) {
					for (const bridge of response.data)
						getConfig(bridge.internalipaddress);
				}
			});
	}, []);

	return { bridges };

	async function getConfig(ip: string) {
		const response = await gretch<HueConfigurationResponse>(`http://${ip}/api/configuration`).json();
		if (response.status === 200 && response.data) {
			setBridges(bridges => [...bridges,
			{
				id: response.data.bridgeid,
				name: response.data.name,
				ip,
				mac: response.data.mac,
				modelid: response.data.modelid,
			}
			]);
		}
	}
}

export interface ConnectToBridgeState {
	isConnected: boolean,
	user?: string,
}

export interface HueUserResponse {
	success: {
		username: string;
	}
}

export function useConnectToBridge(bridge: DiscoveredBridge): ConnectToBridgeState {

	const clientId = useStoreState(store => store.bridges.clientId);
	const addBridge = useStoreActions(store => store.bridges.addBridge);

	const [tryNumber, setTryNumber] = useState(0);
	const [isConnected, setIsConnected] = useState(false);

	// timer to send request every 5 seconds
	// until button is pressed...
	useEffect(() => {
		// if not connected yet, setup interval
		if (!isConnected) {
			const handle = window.setInterval(() => setTryNumber(n => n + 1), 5000);
			return () => window.clearInterval(handle);
		}
	}, [isConnected])

	// requests the bridge for a user
	// on every try number increment (5 sec.)
	useEffect(() => {

		gretch<HueUserResponse[]>(`http://${bridge.ip}/api`, {
			method: "POST",
			body: JSON.stringify({
				"devicetype": `huegui#${clientId}`
			})
		}).json()
			.then(response => {
				// check if success, ignore otherwise, there will be a new request in 5 sec.
				if (response.status === 200 && response.data && response.data.length > 0 && response.data[0].success) {
					// oke? then user pressed button, store the bridge
					addBridge({
						bridge: {
							id: bridge.id,
							ip: bridge.ip,
							name: bridge.name,
							userName: response.data[0].success.username
						}
					});
					setIsConnected(true);
				}
			});
	}, [tryNumber, addBridge, bridge.id, bridge.ip, bridge.name, clientId]);

	return {
		isConnected,
	};

}