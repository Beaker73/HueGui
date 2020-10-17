import { Light } from "../Models";
import { Dictionary, filterDictionary } from "../Helpers";
import { action, Action, computed, Computed, thunk, Thunk } from "easy-peasy";
import { getHueApi } from "../Api";
import { RootStore } from ".";
import { lightConverter } from "../Models/HueApi";

export interface LightStore {
	// state
	all: Dictionary<Light>;
	getById: Computed<LightStore, (id: number) => Light | undefined>;
	getByIds: Computed<LightStore, (id: readonly number[]) => Dictionary<Light>>;

	// actions
	mergeLights: Action<LightStore, Dictionary<Light>>;

	// thunks
	refreshAllLights: Thunk<LightStore>;
}

export const lightState: LightStore = {
	// initial default state
	all: {},

	// computed state implementations
	getById: computed(state => id => state.all[id] ?? void 0),
	getByIds: computed(state => ids => filterDictionary(state.all, l => ids.indexOf(l.id) >= 0)),

	// action implementations
	mergeLights: action((state, lights) => {
		for (const [id, light] of Object.entries(lights)) {
			state.all[id] = light;
		}
	}),

	// thunk implementations
	refreshAllLights: thunk(async ({ mergeLights }, payload, { getStoreState }) => {
		var rootState = getStoreState() as RootStore;

		const bridge = Object.values(rootState.bridges.all).shift();
		if (bridge) {
			const api = getHueApi(bridge);
			const apiLights = await api.lights.getAll();

			const lights = Object.fromEntries(
				Object.entries(apiLights)
					.map(([id, light]) => [id, lightConverter.toStoreModel(light, { id: parseInt(id) })])
			);

			mergeLights(lights);
		}

	}),
}