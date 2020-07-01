import React from "react";
import { Address4 } from "ip-address"
import { Blade } from "@beaker73/fluentui-blades";

import { DiscoveredBridge, useConnectToBridge } from "../Hooks/Discover";
import { Icon, mergeStyleSets, Stack, getTheme } from "@fluentui/react";

import { Field } from "../Components/Field";

export interface ConnectBladeProps {
	bridge: DiscoveredBridge
}

export function ConnectBlade(props: ConnectBladeProps): JSX.Element {

	const theme = getTheme();
	const style = getStyle();

	const { isConnected, secondsLeft } = useConnectToBridge(props.bridge);

	return <Blade title={`Connect to '${props.bridge.name}'`}>
		<Stack tokens={{ childrenGap: theme.spacing.m }}>
			<p>
				Please press the button on the Bridge to give this application 
				access to your Hue system.
			</p>
			<Stack horizontalAlign="center">
				<Icon className={style.bigBadButton} iconName="Touch" />
				<span className={style.counter}>{secondsLeft}</span>
			</Stack>
			<Stack horizontal horizontalAlign="stretch">
				<Stack.Item grow={1}>
					<Field label="Name">{props.bridge.name}</Field>
					<Field label="Model">{props.bridge.modelid}</Field>
				</Stack.Item>
				<Stack.Item grow={1}>
					<Field label="IP Address">{props.bridge.ip.address}</Field>
					<Field label="MAC Address">{props.bridge.id}</Field>
				</Stack.Item>
			</Stack>
		</Stack>
	</Blade>

	function getStyle() {
		return mergeStyleSets({
			bigBadButton: {
				fontSize: 200,
			},
			counter: {
				fontSize: 100,
			}
		})
	}
}