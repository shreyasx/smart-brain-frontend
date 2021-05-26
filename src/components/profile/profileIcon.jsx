import React, { Component } from "react";
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from "reactstrap";
import { API } from "../../backend";
import profile from "./profile.jpg";

class ProfileIcon extends Component {
	state = { dropdownOpen: false };
	toggle = () => {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen,
		}));
	};

	render() {
		return (
			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
				<DropdownToggle
					tag="span"
					data-toggle="dropdown"
					aria-expanded={this.state.dropdownOpen}
				>
					<img
						style={{ margin: "20px", cursor: "pointer" }}
						src={profile}
						className="br-100 h3 w3 dib"
						alt="avatar"
					/>
				</DropdownToggle>
				<DropdownMenu
					right
					className="b--transparent shadow-5"
					style={{ margin: "20px", backgroundColor: "rgba(255,255,255,0.5)" }}
				>
					<DropdownItem onClick={this.props.toggleModal}>
						View Profile
					</DropdownItem>
					<DropdownItem
						onClick={async () => {
							const token = window.sessionStorage.getItem("token");
							if (!token) return;
							const resp = await fetch(`${API}/signout`, {
								headers: {
									"Content-Type": "application/json",
									Authorization: token,
								},
							});
							const signedOut = await resp.json();
							if (signedOut) {
								this.props.onRouteChange("signout");
								this.props.resetState();
							}
						}}
					>
						Sign Out
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		);
	}
}

export default ProfileIcon;
