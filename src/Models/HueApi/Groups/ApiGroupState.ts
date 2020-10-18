import { GroupState } from "../../Store";

export interface ApiGroupState {
    all_on: boolean;
    any_on: boolean;
}

export const groupStateConverter = {
    toStoreModel: (apiGroupState: ApiGroupState): GroupState => {
        return {
            areAllOn: apiGroupState.all_on,
            isAnyOn: apiGroupState.any_on,
        };
    }
}

