import { GroupType } from "./GroupType";
import { GroupState } from "./GroupState";

export interface Group {
    
    groupId: string;
    bridgeId: string;
    key: string;

    name: string;
    lightKeys: string[];
    type: GroupType,
    state: GroupState;
}
