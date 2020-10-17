import { ModelConverter, NumberIdConvertProps } from "../../ModelConverter";
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

export const lightConverter: ModelConverter<ApiLight, Light, NumberIdConvertProps> = {
    toStoreModel: (apiLight, props) => {
        return {
            id: props.id,
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
    toApiModel: (light) => {
        return {
            state: lightStateConverter.toApiModel(light.state),
            type: light.type,
            name: light.name,
            modelid: light.modelId,
            uniqueid: light.uniqueId,
            manufacturername: light.manufacturerName,
            luminaireuniqueid: light.luminaireUniqueId,
            streaming: light.isStreaming,
            proxy: light.isProxy,
            renderer: light.isRenderer,
            swversion: light.softwareVersion,
        }
    }
}