import { Group, GroupType } from "../Models";
import { Dictionary, filterDictionary } from "../Helpers";
import { action, Action, computed, Computed, thunk, Thunk } from "easy-peasy";
import { getHueApi } from "../Api";
import { RootStore } from ".";
import { groupConverter } from "../Models/HueApi";

export interface GroupStore {
	// state
	all: Dictionary<Group>;
	getById: Computed<GroupStore, (id: string) => Group | undefined>;
	getByType: Computed<GroupStore, (type?: GroupType) => Dictionary<Group>>;

	// actions
	mergeGroups: Action<GroupStore, Dictionary<Group>>;

	// thunks
	refreshAllGroups: Thunk<GroupStore>;
}

export const groupState: GroupStore = {
	// initial default state
	all: {},

	// computed state implementations
	getById: computed(state => id => state.all[id] ?? void 0),
	getByType: computed(state => type => type === void 0 ? state.all : filterDictionary(state.all, g => g.type === type)),

	// action implementations
	mergeGroups: action((state, groups) => {
		for(const [id, group] of Object.entries(groups)) {
			state.all[id] = group;
		}
	}),

	// thunk implementations
	refreshAllGroups: thunk(async ({mergeGroups}, payload, { getStoreState }) => {
		var rootState = getStoreState() as RootStore;

		const bridge = Object.values(rootState.bridges.all).shift();
		if(bridge) {
			const api = getHueApi(bridge);
			const apiGroups = await api.groups.getAll();

			const groups = Object.fromEntries(
				Object.entries(apiGroups)
					.map(([id, group]) => [id, groupConverter.toStoreModel(group)])
			);

			mergeGroups(groups);
		}
		
	}),
}