import { Light, LightState } from "../Models";
import { Dictionary, filter, mapEntries } from "../Helpers";
import { action, Action, computed, Computed, thunk, Thunk } from "easy-peasy";
import { getHueApi } from "../Api";
import { RootStore } from ".";
import { lightConverter, lightStateConverter } from "../Models/HueApi";
import { forEachBridge, split } from "./Helpers";

export interface LightStore {
	// state
	all: Dictionary<Light>;
	getByKey: Computed<LightStore, (key: string) => Light | undefined, RootStore>;
	getByKeys: Computed<LightStore, (key: readonly string[]) => Dictionary<Light>, RootStore>;

	// actions
	mergeLights: Action<LightStore, Dictionary<Light>>;
	mergeLight: Action<LightStore, Light>;

	// thunks
	refreshLight: Thunk<LightStore, { lightKey: string }, undefined, RootStore>;
	refreshAllLights: Thunk<LightStore, undefined, undefined, RootStore>;
	changeState: Thunk<LightStore, { key: string, targetState: Partial<LightState> }, undefined, RootStore>;
}

export const lightState: LightStore = {
	// initial default state
	all: {},

	// computed state implementations
	getByKey: computed(state => key => state.all[key] ?? void 0),
	getByKeys: computed(state => keys => filter(state.all, l => keys.indexOf(l.key) >= 0)),

	// action implementations
	mergeLights: action((state, lights) => {
		for (const [key, light] of Object.entries(lights)) {
			state.all[key] = light;
		}
	}),
	mergeLight: action((state, light) => {
		state.all[light.key] = light;
	}),

	// thunk implementations
	refreshLight: thunk(async ({ mergeLight }, { lightKey }, { getStoreState }) => {
		const rootState = getStoreState();
		const [bridgeId, lightId] = split(lightKey);
		const bridge = rootState.bridges.getById(bridgeId);
		if (bridge) {
			const api = getHueApi(bridge);
			const apiLight = await api.lights.getById(lightId);
			if (apiLight)
				mergeLight(lightConverter.toStoreModel(apiLight, { bridgeId, lightId }));
		}
	}),

	refreshAllLights: thunk(async ({ mergeLights }, _, { getStoreState }) => {
		forEachBridge(getStoreState(), async ({ api, bridgeId }) => {
			const apiLights = await api.lights.getAll();
			const lights = mapEntries(apiLights, (lightId, light) => ([
				bridgeId + ":" + lightId,
				lightConverter.toStoreModel(light, { bridgeId, lightId })
			]));
			mergeLights(lights);
		});
	}),

	changeState: thunk(async (_, { key, targetState }, { getStoreState }) => {

		debugger;
		
		var rootState = getStoreState();
		const [bridgeId, lightId] = split(key);

		const bridge = rootState.bridges.getById(bridgeId);
		if (bridge) {
			const api = getHueApi(bridge);
			await api.lights.updateState(lightId, lightStateConverter.toApiModel(targetState));
		}
	}),
}
