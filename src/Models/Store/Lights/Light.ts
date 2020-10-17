import { LightState } from "./LightState";

export interface Light {
    id: number;
    state: LightState;
    type: string;
    name: string;
    modelId: string;
    uniqueId: string;
    manufacturerName: string;
    luminaireUniqueId: string;
    isStreaming: boolean;
    isRenderer: boolean;
    isProxy: boolean;
    softwareVersion: string;
}