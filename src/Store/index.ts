import { createStore, createTypedHooks, persist } from "easy-peasy";

import { bridgeState, BridgeStore } from "./BridgeStore";

export interface RootStore {
	bridges: BridgeStore;
}

const rootStore: RootStore = {
	bridges: bridgeState,
}

export const store = createStore(persist(rootStore, { storage: "localStorage" }));

const typedHooks = createTypedHooks<RootStore>();
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;