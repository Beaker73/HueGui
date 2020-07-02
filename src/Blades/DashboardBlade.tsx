import React from "react";
import { Blade } from "@beaker73/fluentui-blades";

import { useRedirectWhenNoBridge } from "../Hooks/Discover";

export function DashboardBlade(): JSX.Element {

	useRedirectWhenNoBridge();

	return <Blade title="Dashboard">
	</Blade>;
}
