import React from "react";
import ProfileIcon from "../profile/profileIcon";

const Navigation = ({ resetState, onRouteChange, toggleModal, isSignedIn }) => {
	return isSignedIn ? (
		<nav style={{ display: "flex", justifyContent: "flex-end" }}>
			<ProfileIcon
				toggleModal={toggleModal}
				resetState={resetState}
				onRouteChange={onRouteChange}
			/>
			{/* <p
				onClick={() => {
					onRouteChange("signout");
					resetState();
				}}
				className="f3 link dim black underline pa3 pointer"
			>
				Sign Out
			</p> */}
		</nav>
	) : (
		<nav style={{ display: "flex", justifyContent: "flex-end" }}>
			<p
				onClick={() => onRouteChange("signin")}
				className="f3 link dim black underline pa3 pointer"
			>
				Sign In
			</p>
			<p
				onClick={() => onRouteChange("register")}
				className="f3 link dim black underline pa3 pointer"
			>
				Register
			</p>
		</nav>
	);
};

export default Navigation;
