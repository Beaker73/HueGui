import { ModelConverter } from "../../ModelConverter";
import { GroupState } from "../../Store";

export interface ApiGroupState {
    all_on: boolean;
    any_on: boolean;
}

export const groupStateConverter: ModelConverter<ApiGroupState, GroupState> = {
    toStoreModel: apiGroupState => {
        return {
            areAllOn: apiGroupState.all_on,
            isAnyOn: apiGroupState.any_on,
        };
    },
    toApiModel: groupState => {
        return {
            all_on: groupState.areAllOn,
            any_on: groupState.isAnyOn,
        }
    }
}

