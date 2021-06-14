import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "tachyons";
import "./index.css";
const App = lazy(() => import("./App"));

ReactDOM.render(
	<Suspense fallback={<h1>Loading Application...</h1>}>
		<App />
	</Suspense>,
	document.getElementById("root")
);
