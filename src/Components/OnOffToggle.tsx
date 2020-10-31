import React from "react";
import { Toggle } from "@fluentui/react";

import { Light } from "../Models";
import { useStoreActions } from "../Store";

export interface LightOnOffToggleProps {
    light?: Light;
}

export function LightOnOffToggle(props: LightOnOffToggleProps): JSX.Element {
    const state = props.light?.state;
    const key = props.light?.key;
    const changeState = useStoreActions(store => store.lights.changeState);

    return <Toggle checked={state?.isOn} onChange={(e, checked) => setState(checked ?? false)} />;

    function setState(isOn: boolean) {
        if (key) {
            changeState({ key, targetState: { isOn } });
        }
    }
}
