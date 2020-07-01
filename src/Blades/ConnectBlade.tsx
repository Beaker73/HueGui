import React from "react";
import { Blade, useBlade } from "@beaker73/fluentui-blades";

import { DiscoveredBridge, useConnectToBridge } from "../Hooks/Discover";
import { Icon, mergeStyleSets, Stack, getTheme, DefaultButton } from "@fluentui/react";

import { Field } from "../Components/Field";

export interface ConnectBladeProps {
	bridge: DiscoveredBridge
}

export function ConnectBlade(props: ConnectBladeProps): JSX.Element {

	const theme = getTheme();
	const style = getStyle();

	const { closeBlade } = useBlade();
	const { isConnected } = useConnectToBridge(props.bridge);

	return <Blade title={`Connect to '${props.bridge.name}'`}>
		<Stack tokens={{ childrenGap: theme.spacing.m }}>
			{isConnected ? renderConnected() : renderTimer()}
		</Stack>
	</Blade>

	function renderTimer(): JSX.Element {
		return <>
			<p>
				Please press the button on the Bridge to give this application
				access to your Hue system.
			</p>
			<Stack horizontalAlign="center">
				<Icon className={style.bigBadButton} iconName="Touch" />
			</Stack>
			<Field label="Name">{props.bridge.name}</Field>
			<Field label="Model">{props.bridge.modelid}</Field>
			<Field label="IP Address">{props.bridge.ip}</Field>
			<Field label="MAC Address">{props.bridge.id}</Field>
		</>;
	}

	function renderConnected(): JSX.Element {
		return <>
			<p>
				You have successfully connected
				to the bridge named: '{props.bridge.name}'
			</p>
			<DefaultButton onClick={closeBlade}>Ok</DefaultButton>
		</>;
	}

	function getStyle() {
		return mergeStyleSets({
			bigBadButton: {
				fontSize: 200,
			}
		})
	}
}