import React, { useState } from "react";
import { Blade } from "@beaker73/fluentui-blades";
import { Dashboard, DashboardTileProps, DashboardTileDefinitionProps } from "@beaker73/fluentui-dashboard";

import { useRedirectWhenNoBridge } from "../Hooks/Discover";

export function DashboardBlade(): JSX.Element {

	useRedirectWhenNoBridge();

	const definitions: DashboardTileDefinitionProps[] = [
		{ name: "light", title: "Tafel", width: 2, height: 1 }
	];

	const [tileProps] = useState<readonly DashboardTileProps[]>([
		{ id: "banaan", definition: definitions[0] }
	]);
	const tiles: JSX.Element[] = tileProps.map(p => {
		return <Dashboard.Tile key={p.id} {...p}>
		</Dashboard.Tile>
	})

	return <Blade title="Dashboard">
		<Dashboard tileSize={180} editting={true} verticalFill>
			{tiles}
		</Dashboard>
	</Blade>;
}
