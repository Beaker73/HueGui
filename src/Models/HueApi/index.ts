import { Dictionary } from "../../Helpers";
import { ApiLight } from "./Lights";
import { ApiGroup } from "./Groups";

export * from "./Groups";
export * from "./Lights";

export interface ApiRoot {
    lights: Dictionary<ApiLight>;
    groups: Dictionary<ApiGroup>;
}