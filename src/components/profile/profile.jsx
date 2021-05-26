import React, { useState } from "react";
import "./profile.css";
import { API } from "../../backend";
import profile from "./profile.jpg";

const Profile = ({ user, toggleModal, loadUser }) => {
	const [values, setValues] = useState({
		name: user.name,
		pet: user.pet,
		age: user.age,
	});

	const onFormChange = event => {
		switch (event.target.name) {
			case "user-name":
				setValues({ ...values, name: event.target.value });
				break;
			case "user-age":
				setValues({ ...values, age: event.target.value });
				break;
			case "user-pet":
				setValues({ ...values, pet: event.target.value });
				break;
			default:
				return;
		}
	};

	const onProfileUpdate = async data => {
		const token = window.sessionStorage.getItem("token");
		if (!token) return;
		const response = await fetch(`${API}/profile/${user.id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			body: JSON.stringify({ formInput: data }),
		});
		if (response.status === 200 || response.status === 304) {
			const resp = await response.json();
			loadUser(resp);
			toggleModal();
		}
	};

	return (
		<div className="profile-modal">
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 bg-white center">
				<main className="pa4 black-80 w-80">
					<img
						src={profile}
						className="h3 w3 dib"
						style={{ margin: "20px", cursor: "pointer" }}
						alt="avatar"
					/>
					<h1>{values.name}</h1>
					<h4>Images submitted: {user.entries}</h4>
					<p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
					<hr />
					<form className="measure">
						<label className="mt2 fw6" htmlFor="user-name">
							Name:
						</label>
						<input
							className="pa2 ba w-100"
							value={values.name}
							type="text"
							name="user-name"
							id="user-name"
							onChange={onFormChange}
						/>
						<label className="mt2 fw6" htmlFor="user-age">
							Age:
						</label>
						<input
							onChange={onFormChange}
							className="pa2 ba w-100"
							value={values.age}
							type="text"
							name="user-age"
							id="user-age"
						/>
						<label className="mt2 fw6" htmlFor="user-pet">
							Pet:
						</label>
						<input
							onChange={onFormChange}
							className="pa2 ba w-100"
							value={values.pet}
							type="text"
							name="user-pet"
							id="user-pet"
						/>

						<div
							className="mt4"
							style={{ display: "flex", justifyContent: "space-evenly" }}
						>
							<button
								onClick={e => {
									e.preventDefault();
									const { name, age, pet } = values;
									onProfileUpdate({ name, age, pet });
								}}
								className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
							>
								Save
							</button>
							<button
								onClick={toggleModal}
								className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
							>
								Cancel
							</button>
						</div>
					</form>
				</main>
				<div className="modal-close" onClick={toggleModal}>
					&times;
				</div>
			</article>
		</div>
	);
};

export default Profile;
