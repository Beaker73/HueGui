import { GroupType } from "./GroupType";
import { LightAction } from "../Lights";

export interface Group {
    name: string;
    lights: number[];
    type: GroupType,
    action: LightAction;
}
