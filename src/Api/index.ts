import { gretch } from "gretchen";
import { Dictionary } from "../Helpers";
import { ApiGroup } from "../Models/HueApi";
import { Bridge } from "../Models/Store";

export interface HueApi {
    groups: HueApiGroups;
}

export interface HueApiGroups {
    getAll(): Promise<Dictionary<ApiGroup>>;
    getById(id: string): Promise<ApiGroup | undefined>;
}

export function getHueApi(bridge: Bridge): HueApi {
    return {
        groups: getHueApiGroups(),
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

    async function get<T>(path: string): Promise<T> {
        const url = `http://${bridge.ip}/api/${bridge.userName}/${path}`;
        const response = await gretch<T>(url).json();

        if(response.status >= 200 && response.status < 300 && response.data)
            return response.data;

        throw new Error(response.error);
    }
}