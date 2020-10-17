import { useEffect } from "react";
import { Dictionary, filterDictionary } from "../Helpers";
import { Light } from "../Models";
import { useStoreActions, useStoreState } from "../Store";
import { useInterval } from "./Browser";

export function useAllLights(refreshInterval?: number): Dictionary<Light> {
    const refresh = useStoreActions(store => store.lights.refreshAllLights);
    const interval = useInterval(refreshInterval ?? 2500);
    useEffect(() => {
        refresh();
    }, [interval, refreshInterval]);

    return useStoreState(state => state.lights.all);
}

export function useSpecificLights(ids: number[], refreshInterval?: number) {
    const allLights = useAllLights(refreshInterval);
    if(ids.length === 0)
        return allLights;
    return filterDictionary(allLights, light => ids.indexOf(light.id) >= 0);
}