import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "tachyons";
import "./index.css";
import { logUserIn } from "./reducers";

const logger = createLogger();
// const rootReducer = combineReducers({ searchRobots, requestRobots });

const store = createStore(
	logUserIn,
	composeWithDevTools(applyMiddleware(logger, thunkMiddleware))
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
