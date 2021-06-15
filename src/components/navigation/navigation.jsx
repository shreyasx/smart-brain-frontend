import React from "react";
import ProfileIcon from "../profile/profileIcon";

const Navigation = ({
	resetState,
	onRouteChange,
	toggleModal,
	isSignedIn,
	image,
}) => {
	return isSignedIn ? (
		<nav style={{ display: "flex", justifyContent: "flex-end" }}>
			<ProfileIcon
				image={image}
				toggleModal={toggleModal}
				resetState={resetState}
				onRouteChange={onRouteChange}
			/>
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
