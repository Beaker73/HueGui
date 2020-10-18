import { Action, action, Computed, computed } from "easy-peasy";
import { v4 } from "uuid";

import { Bridge } from "../Models";
import { Dictionary } from "../Helpers";

export interface BridgeStore {
	// state
	all: Dictionary<Bridge>;
	clientId: string | null;

	// computed state
	getById: Computed<BridgeStore, (id: string) => Bridge | undefined>;
	bridgeCount: Computed<BridgeStore, number>;

	// actions
	initializeClientId: Action<BridgeStore>;
	addBridge: Action<BridgeStore, { bridge: Bridge }>;
}

export const bridgeState: BridgeStore = {
	// initial default state
	all: {},
	clientId: null,

	// computed state implementations
	getById: computed(state => id => state.all[id]),
	bridgeCount: computed(state => Object.values(state.all).length),

	// action implementations
	initializeClientId: action((state) => {
		if(!state.clientId)
			state.clientId = v4().replace(/-/gi, "");
	}),
	addBridge: action((state, { bridge }) => {
		state.all[bridge.id] = bridge;
	}),
}