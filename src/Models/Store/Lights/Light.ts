import { LightState } from "./LightState";

export interface Light {
    
    bridgeId: string;
    lightId: string;
    key: string;

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