import { GroupType } from "./GroupType";
import { GroupState } from "./GroupState";

export interface Group {
    id: number;
    name: string;
    lights: number[];
    type: GroupType,
    state: GroupState;
}
