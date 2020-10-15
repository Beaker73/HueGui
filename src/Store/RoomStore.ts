import { Action, action } from "easy-peasy";

import { Room } from "../Models";
import { Dictionary } from "../Helpers";

export interface RoomStore {
	// state
	all: Dictionary<Room>;
}

export const roomState: RoomStore = {
	// initial default state
	all: {},
}