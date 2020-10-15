import { Group, GroupType } from "../../Store";
import { ModelConverter } from "../../ModelConverter";
import { ApiLightAction, lightActionConverter } from "../Lights";

export interface ApiGroup {
    name: string;
    lights: number[];
    type: GroupType,
    action: ApiLightAction;
}

export const groupConverter: ModelConverter<ApiGroup, Group> = {
    toStoreModel: (apiGroup: ApiGroup): Group => {
        return {
            name: apiGroup.name,
            lights: apiGroup.lights,
            type: apiGroup.type,
            action: lightActionConverter.toStoreModel(apiGroup.action),
        };
    },
    toApiModel: (group: Group): ApiGroup => {
        return {
            name: group.name,
            lights: group.lights,
            type: group.type,
            action: lightActionConverter.toApiModel(group.action),
        }
    }
}

