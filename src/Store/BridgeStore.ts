import { Action, action } from "easy-peasy";
import { v4 } from "uuid";

import { Bridge } from "../Models";
import { Dictionary } from "../Helpers";

export interface BridgeStore {
	// state
	all: Dictionary<Bridge>;
	clientId: string | null;

	// actions
	initializeClientId: Action<BridgeStore>;
	addBridge: Action<BridgeStore, { bridge: Bridge }>;
}

export const bridgeState: BridgeStore = {
	// initial default state
	all: {},
	clientId: null,

	// action implementations
	initializeClientId: action((state) => {
		if(!state.clientId)
			state.clientId = v4().replace(/-/gi, "");
	}),
	addBridge: action((state, { bridge }) => {
		state.all[bridge.id] = bridge;
	}),
}