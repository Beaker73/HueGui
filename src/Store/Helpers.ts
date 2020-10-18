import { StateMapper } from "easy-peasy";
import { RootStore } from ".";
import { getHueApi, HueApi } from "../Api";
import { Bridge } from "../Models";

export async function forEachBridge<T>(
    rootState: StateMapper<RootStore>,
    callback: (props: { api: HueApi, bridge: Bridge, bridgeId: string }) => T
): Promise<void> {
    await Promise.all(Object.values(rootState.bridges.all).map(async bridge => {
        const api = getHueApi(bridge);
        await callback({ api, bridge, bridgeId: bridge.id });
    }));
}

export function split(key: string): [string, string] {
    const ix = key.indexOf(":");
    return [
        key.substr(0, ix),
        key.substring(ix + 1, key.length)
    ];
}