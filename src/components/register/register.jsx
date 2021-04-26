import React from "react";
import { Component } from "react";
import { API } from "../../backend";

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			name: "",
			error: "",
			loading: false,
		};
	}

	onEmailChange = e => this.setState({ email: e.target.value });
	onPasswordChange = e => this.setState({ password: e.target.value });
	onNameChange = e => this.setState({ name: e.target.value });

	onSubmitSignIn = ev => {
		ev.preventDefault();
		this.setState({ loading: true });
		fetch(`${API}/register`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				name: this.state.name,
			}),
		})
			.then(resp => resp.json())
			.then(data => {
				if (data.id) {
					this.props.loadUser(data);
					this.props.onRouteChange("home");
				}
				if (data.error) this.setState({ error: data.error });
				this.setState({ loading: false });
			});
	};

	render() {
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
					<form className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f1 fw6 ph0 mh0">Register</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="name">
									Name
								</label>
								<input
									onChange={this.onNameChange}
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="text"
									name="name"
									id="name"
								/>
							</div>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="email-address">
									Email
								</label>
								<input
									onChange={this.onEmailChange}
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="email"
									name="email-address"
									id="email-address"
								/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor="password">
									Password
								</label>
								<input
									onChange={this.onPasswordChange}
									className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="password"
									name="password"
									id="password"
								/>
								{this.state.error === "" ? "" : <p>{this.state.error}</p>}
								{this.state.loading && <p>Loading..</p>}
							</div>
						</fieldset>
						<div className="">
							<input
								onClick={this.onSubmitSignIn}
								className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
								type="submit"
								value="Register"
							/>
						</div>
					</form>
				</main>
			</article>
		);
	}
}

export default Register;
