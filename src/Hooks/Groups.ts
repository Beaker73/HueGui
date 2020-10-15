import { useEffect } from "react";
import { Dictionary } from "../Helpers";
import { Group, GroupType } from "../Models";
import { useStoreActions, useStoreState } from "../Store";
import { useInterval } from "./Browser";

export function useGroups(type?: GroupType, refreshInterval?: number): Dictionary<Group> {

    const refresh = useStoreActions(store => store.rooms.refreshAllGroups);
    const interval = useInterval(refreshInterval ?? 5000);
    useEffect(() => {
        refresh();
    }, [interval, refreshInterval]);

    return useStoreState(state => state.rooms.getByType(type));
}