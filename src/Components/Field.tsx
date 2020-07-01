import React, { PropsWithChildren } from "react";
import { ICommandBarItemProps, ContextualMenuItemType, Stack, CommandBar, Text, Label } from "@fluentui/react";

export interface FieldProps {
    label: string,
    subLabel?: string,
    url?: string,
    buttons?: ICommandBarItemProps[],
}

export function Field(props: PropsWithChildren<FieldProps>): JSX.Element {
    return <Stack.Item>
        { props.buttons 
            ? <CommandBar styles={{root: {padding: 0}}} items={[
                { key: "title", itemType: ContextualMenuItemType.Header, onRender: renderLabel }
            ]} farItems={props.buttons} />
            : renderLabel()
        }
        { props.children }
    </Stack.Item>;

    function renderLabel(): JSX.Element {
        return <Label>{props.label}
            { props.subLabel ? renderSubLabel() : undefined } 
        </Label>
    }

    function renderSubLabel(): JSX.Element | undefined {
        if(props.url)
            return <>&nbsp;
                <a href={props.url} target="_blank">{render()}</a>
            </>;
        return <>&nbsp;{render()}</>;

        function render() {
            return <Text variant="small" style={{ opacity: 0.5 }}>{props.subLabel}</Text>;
        }
    }
}