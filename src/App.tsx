import React from "react";
import { Fabric, Stack, mergeStyleSets, getTheme } from "@fluentui/react";
import { BladeHost, BladeList } from "@beaker73/fluentui-blades";

import { useStoreActions, useStoreState } from "./Store";

import { DashboardBlade } from "./Blades/DashboardBlade";
import { Menu } from "./Components/Menu";

import "./styles.css";

function App(): JSX.Element {

	const clientId = useStoreState(state => state.bridges.clientId);
	const initializeClientId = useStoreActions(store => store.bridges.initializeClientId);
	if (!clientId)
		initializeClientId();

	const theme = getTheme();
	const style = getStyle();

	return <Fabric className="full-page">
		<BladeHost>
			<Stack className="full-page">
				<Stack.Item grow={0} className={style.menuBar} >
					<Menu />
				</Stack.Item>
				<Stack.Item grow={1} className={style.bladeHost} >
					<BladeList>
						<DashboardBlade />
					</BladeList>
				</Stack.Item>
			</Stack>
		</BladeHost>
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
