import { SET_USER } from "./constants";

export const setUser = user => {
	console.log("in action-", user);
	return { type: SET_USER, payload: user };
};
