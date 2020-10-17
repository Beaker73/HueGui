import { Group, GroupType } from "../../Store";
import { ModelConverter, NumberIdConvertProps } from "../../ModelConverter";
import { ApiLightState } from "../Lights";
import { ApiGroupState, groupStateConverter } from "./ApiGroupState";

export interface ApiGroup {
    name: string;
    lights: string[];
    type: GroupType,
    action?: ApiLightState;
    state: ApiGroupState;
}

export const groupConverter: ModelConverter<ApiGroup, Group, NumberIdConvertProps> = {
    toStoreModel: (apiGroup, props) => {
        return {
            id: props.id,
            name: apiGroup.name,
            lights: apiGroup.lights?.map(id => parseInt(id)) ?? [],
            type: apiGroup.type,
            state: groupStateConverter.toStoreModel(apiGroup.state),
        };
    },
    toApiModel: group => {
        return {
            name: group.name,
            lights: group.lights.map(id => id.toString()),
            type: group.type,
            state: groupStateConverter.toApiModel(group.state),
        }
    }
}

