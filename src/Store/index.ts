import { createStore, createTypedHooks, persist } from "easy-peasy";

import { bridgeState, BridgeStore } from "./BridgeStore";
import { roomState, RoomStore } from "./RoomStore";

export interface RootStore {
	bridges: BridgeStore;
	rooms: RoomStore;
}

const rootState: RootStore = {
	bridges: bridgeState,
	rooms: roomState,
}

// export const store = createStore(rootState);
export const store = createStore(persist(rootState, { storage: "localStorage" }));

const typedHooks = createTypedHooks<RootStore>();
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;