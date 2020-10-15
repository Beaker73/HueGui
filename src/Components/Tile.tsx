import React, { useMemo } from "react";
import { mergeStyleSets, getTheme } from "@fluentui/react";

export interface TileProps {
}

export function Tile(props: TileProps): JSX.Element {

	const theme = getTheme();
	const style = useMemo(getStyle, [theme]);

	return <div className={style.tile}>test</div>

	function getStyle() {
		return mergeStyleSets({
			tile: {
				boxShadow: theme.effects.elevation4,
			}
		});
	}
}