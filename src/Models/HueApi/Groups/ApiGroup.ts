import { Group, GroupType } from "../../Store";
import { ApiLightState } from "../Lights";
import { ApiGroupState, groupStateConverter } from "./ApiGroupState";

export interface ApiGroup {
    name: string;
    lights: string[];
    type: GroupType,
    action?: ApiLightState;
    state: ApiGroupState;
}

export const groupConverter = {
    toStoreModel: (apiGroup: ApiGroup, props: { bridgeId: string, groupId: string }): Group => {
        const { bridgeId, groupId } = props;
        return {

            bridgeId,
            groupId,
            key: bridgeId + ":" + groupId,

            name: apiGroup.name,
            lightKeys: apiGroup.lights?.map(id => bridgeId + ":" + id) ?? [],
            type: apiGroup.type,
            state: groupStateConverter.toStoreModel(apiGroup.state),
        };
    },
}

