import { gretch } from "gretchen";
import { Dictionary } from "../Helpers";
import { ApiGroup, ApiLight } from "../Models/HueApi";
import { Bridge } from "../Models/Store";

export interface HueApi {
    groups: HueApiGroups;
    lights: HueApiLights;
}

export interface HueApiGroups {
    getAll(): Promise<Dictionary<ApiGroup>>;
    getById(id: string): Promise<ApiGroup | undefined>;
}

export interface HueApiLights {
    getAll(): Promise<Dictionary<ApiLight>>;
    getById(id: string): Promise<ApiLight | undefined>;
}

export function getHueApi(bridge: Bridge): HueApi {
    return {
        groups: getHueApiGroups(),
        lights: getHueApiLights(),
    }

    function getHueApiGroups() {
        return {
            getAll, 
            getById,
        }

        async function getAll(): Promise<Dictionary<ApiGroup>> {
            return await get<Dictionary<ApiGroup>>("groups");
        }

        async function getById(id: string): Promise<ApiGroup | undefined> {
            return await get<ApiGroup>(`groups/${id}`);
        }
    }

    function getHueApiLights() {
        return {
            getAll, 
            getById,
        }

        async function getAll(): Promise<Dictionary<ApiLight>> {
            return await get<Dictionary<ApiLight>>("lights");
        }

        async function getById(id: string): Promise<ApiLight | undefined> {
            return await get<ApiLight>(`lights/${id}`);
        }
    }

    async function get<T>(path: string): Promise<T> {
        const url = `http://${bridge.ip}/api/${bridge.userName}/${path}`;
        const response = await gretch<T>(url).json();

        if(response.status >= 200 && response.status < 300 && response.data)
            return response.data;

        throw new Error(response.error);
    }
}