import { SET_USER } from "./constants";

const initialState = { user: {} };

export const logUserIn = (state = initialState, action = {}) => {
	console.log("rcvd in reducer- ", action);
	switch (action.type) {
		case SET_USER:
			return Object.assign({}, state, { user: action.payload });
		default:
			return state;
	}
};
