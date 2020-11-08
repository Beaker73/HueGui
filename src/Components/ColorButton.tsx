import React, { PropsWithChildren, useMemo } from "react";
import { getTheme, mergeStyleSets, Stack, StackItem, Text } from "@fluentui/react";

import { Color, Rgb } from "../Models";

export interface ColorButtonProps {
    color: Color;
    onClick?(color: Color): void;
}

export function ColorButton(props: PropsWithChildren<ColorButtonProps>): JSX.Element {

    const theme = getTheme();
    const style = useMemo(getStyle, [theme, props.color]);

    return <div className={style.button} onClick={onClick}>
        <Stack verticalFill verticalAlign="center" className={style.container}>
            <StackItem grow={1}>
                <Stack horizontal verticalFill verticalAlign="center">
                    <Stack className={style.center}>
                        <Text variant="medium">
                            <div className={style.buttonFont}>
                                {props.children}
                            </div>
                        </Text>
                    </Stack>
                </Stack>
            </StackItem>
            <StackItem shrink={1}>
                <Stack horizontalAlign="center">
                    <Text variant="xSmall">
                        {props.color?.toString()}
                    </Text>
                </Stack>
            </StackItem>
        </Stack>
    </div>;

    function onClick() {
        if (props.onClick)
            props.onClick(props.color);
    }

    function getStyle() {

        let rgb = props.color.toRgb() ?? Rgb.fromJson(theme.semanticColors.buttonBackground);
        const hoverRgb = rgb.toHsb().adjustBrightness(0.9).toRgb();

        return mergeStyleSets({
            button: {
                cursor: "pointer",
                border: "solid 1px " + theme.semanticColors.buttonBorder,
                borderRadius: theme.effects.roundedCorner2,
                background: rgb.toCss(),
                width: 86, height: 86,
                selectors: {
                    "&:hover": {
                        background: hoverRgb.toCss(),
                    }
                }
            },
            container: {
                margin: theme.spacing.s2,
                width: 78, height: 78,
            },
            center: {
                textAlign: "center",
                width: "100%",
            },
            buttonFont: {
                fontWeight: 600,
            }
        });
    }

}