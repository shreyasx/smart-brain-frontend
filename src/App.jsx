import React, { Component } from "react";
import Navigation from "./components/navigation/navigation";
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/imagelinkform/imagelinkform";
import Rank from "./components/rank/rank";
import Particles from "react-particles-js";
import "./App.css";
import FaceRecognition from "./components/facerecognition/facerecognition";
import Register from "./components/register/register";
import Signin from "./components/signin/signin";
import { API } from "./backend";

const initialState = {
	input: "",
	imageUrl: "",
	boxes: [],
	route: "signin",
	isSignedIn: false,
	user: {
		id: "",
		name: "",
		email: "",
		entries: 0,
		joined: new Date(),
	},
};

const particlesOpt = {
	particles: {
		number: {
			value: 40,
			density: {
				enable: true,
				value_area: 800,
			},
		},
	},
};

class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}

	resetState = () => this.setState(initialState);

	loadUser = user => this.setState({ user });

	calculateFaceLocation = face => {
		const image = document.getElementById("inputimage");
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: face.left_col * width,
			topRow: face.top_row * height,
			rightCol: width - face.right_col * width,
			bottomRow: height - face.bottom_row * height,
		};
	};

	displayFace = box => {
		const boxes = [...this.state.boxes];
		boxes.push(box);
		this.setState({ boxes });
	};

	onInputChange = e => this.setState({ input: e.target.value });

	onButtonSubmit = () => {
		this.setState({ imageUrl: this.state.input });
		fetch(`${API}/imageurl`, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ input: this.state.input }),
		})
			.then(resp => resp.json())
			.then(resp => {
				if (resp)
					fetch(`${API}/image`, {
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ id: this.state.user.id }),
					})
						.then(response => response.json())
						.then(count =>
							this.setState(Object.assign(this.state.user, { entries: count }))
						)
						.catch(console.log);
				for (var i = 0; i < resp.outputs[0].data.regions.length; i++)
					this.displayFace(
						this.calculateFaceLocation(
							resp.outputs[0].data.regions[i].region_info.bounding_box
						)
					);
			})
			.catch(e => console.log(e));
	};

	onRouteChange = route => {
		if (route === "signout") this.setState({ isSignedIn: false });
		else if (route === "home") this.setState({ isSignedIn: true });
		this.setState({ route });
	};

	render() {
		const { isSignedIn, boxes, imageUrl, route, user } = this.state;
		return (
			<div className="App">
				<Particles className="particles" params={particlesOpt} />
				<Navigation
					resetState={this.resetState}
					isSignedIn={isSignedIn}
					onRouteChange={this.onRouteChange}
				/>
				{route === "home" ? (
					<div>
						<Logo />
						<Rank name={user.name} entries={user.entries} />
						<ImageLinkForm
							onButtonSubmit={this.onButtonSubmit}
							onInputChange={this.onInputChange}
						/>
						<FaceRecognition boxes={boxes} imageUrl={imageUrl} />
					</div>
				) : route === "signin" ? (
					<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
				) : (
					<Register
						loadUser={this.loadUser}
						onRouteChange={this.onRouteChange}
					/>
				)}
			</div>
		);
	}
}

export default App;
