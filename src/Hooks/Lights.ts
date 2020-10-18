import { useEffect } from "react";
import { Dictionary, filterDictionary } from "../Helpers";
import { Light } from "../Models";
import { useStoreActions, useStoreState } from "../Store";
import { useInterval } from "./Browser";

export function useLight(lightKey: string, refreshInterval?: number): Light | undefined {
    const refresh = useStoreActions(store => store.lights.refreshLight);
    const interval = useInterval(refreshInterval ?? 2500);
    useEffect(() => {
        refresh({ lightKey });
    }, [lightKey, interval, refreshInterval]);

    return useStoreState(state => state.lights.getByKey(lightKey));
}

export function useAllLights(refreshInterval?: number): Dictionary<Light> {
    const refresh = useStoreActions(store => store.lights.refreshAllLights);
    const interval = useInterval(refreshInterval ?? 2500);
    useEffect(() => {
        refresh();
    }, [interval, refreshInterval]);

    return useStoreState(state => state.lights.all);
}

export function useSpecificLights(lightKeys: string[], refreshInterval?: number) {
    const allLights = useAllLights(refreshInterval);
    if (lightKeys.length === 0)
        return allLights;
    return filterDictionary(allLights, light => lightKeys.indexOf(light.key) >= 0);
}