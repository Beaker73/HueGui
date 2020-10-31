import React from "react";
import { Fabric, Stack, mergeStyleSets, getTheme, Customizer, loadTheme } from "@fluentui/react";
import { BladeHost, BladeList } from "@beaker73/fluentui-blades";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend"

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
		<DndProvider backend={HTML5Backend}>
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
		</DndProvider>
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
