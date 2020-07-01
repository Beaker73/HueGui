import { Address4 } from "ip-address";
import { gretch } from "gretchen";
import { useEffect, useState } from "react";

export interface DiscoveredBridge {
	id: string;
	name: string;
	ip: Address4;
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
				if (response.status == 200 && response.data && Array.isArray(response.data)) {
					for (const bridge of response.data)
						getConfig(bridge.internalipaddress);
				}
			});
	}, []);

	return { bridges };

	async function getConfig(ip: string) {
		const response = await gretch<HueConfigurationResponse>(`http://${ip}/api/configuration`).json();
		if (response.status == 200 && response.data) {
			setBridges(bridges => [...bridges,
			{
				id: response.data.bridgeid,
				name: response.data.name,
				ip: new Address4(ip),
				mac: response.data.mac,
				modelid: response.data.modelid,
			}
			]);
		}
	}
}