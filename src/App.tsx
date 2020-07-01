import React from "react";
import { Fabric, CommandBar, Stack, mergeStyleSets, getTheme } from "@fluentui/react";
import { BladeHost } from "@beaker73/fluentui-blades";

import { RootBlade } from "./Blades/RootBlade";

import "./styles.css";
import { useStoreActions, useStoreState } from "./Store";

function App(): JSX.Element {

	const clientId = useStoreState(state => state.bridges.clientId);
	const initializeClientId = useStoreActions(store => store.bridges.initializeClientId);
	if(!clientId)
		initializeClientId();

	const theme = getTheme();
	const style = getStyle();

	return <Fabric className="full-page">
		<Stack className="full-page">
			<Stack.Item grow={0} className={style.menuBar} >
				<CommandBar items={[]} farItems={[]} />
			</Stack.Item>
			<Stack.Item grow={1} className={style.bladeHost} >
				<BladeHost className={style.bladeHost} root={{ bladeType: RootBlade, bladeProps: {} }} />
			</Stack.Item>
		</Stack>
	</Fabric>

	function getStyle() {
		return mergeStyleSets({
			bladeHost: {
				height: "100%",
				background: theme.semanticColors.bodyStandoutBackground,
			},
			menuBar: {
				boxShadow: theme.effects.elevation4,
				zIndex: 100,
			}
		})
	}
}

export default App;
