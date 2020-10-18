import { Light } from "../../Store";
import { ApiLightState, lightStateConverter } from "./ApiLightState";

export interface ApiLight {
    state: ApiLightState;
    type: string;
    name: string;
    modelid: string;
    uniqueid: string;
    manufacturername: string;
    luminaireuniqueid: string;
    streaming: boolean;
    renderer: boolean;
    proxy: boolean;
    swversion: string;
}

export const lightConverter = {
    toStoreModel: (apiLight: ApiLight, props: { bridgeId: string, lightId: string }): Light => {
        return {
            
            lightId: props.lightId,
            bridgeId: props.bridgeId,
            key: props.bridgeId + ":" + props.lightId,

            state: lightStateConverter.toStoreModel(apiLight.state),
            type: apiLight.type,
            name: apiLight.name,
            modelId: apiLight.modelid,
            uniqueId: apiLight.uniqueid,
            manufacturerName: apiLight.manufacturername,
            luminaireUniqueId: apiLight.luminaireuniqueid,
            isStreaming: apiLight.streaming,
            isProxy: apiLight.proxy,
            isRenderer: apiLight.renderer,
            softwareVersion: apiLight.swversion,

        }
    },
}