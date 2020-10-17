import { createStore, createTypedHooks, persist } from "easy-peasy";

import { bridgeState, BridgeStore } from "./BridgeStore";
import { groupState, GroupStore } from "./GroupStore";
import { lightState, LightStore } from "./LightStore";

export interface RootStore {
	bridges: BridgeStore;
	groups: GroupStore;
	lights: LightStore;
}

const rootState: RootStore = {
	bridges: bridgeState,
	groups: groupState,
	lights: lightState,
}

// export const store = createStore(rootState);
export const store = createStore(persist(rootState, { storage: "localStorage" }));

const typedHooks = createTypedHooks<RootStore>();
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;