import React, { useState } from "react";
import "./profile.css";
import { API } from "../../backend";
import profile from "./profile.jpg";
import Spinner from "./spinner";

const Profile = ({ user, toggleModal, loadUser }) => {
	const [values, setValues] = useState({
		name: user.name,
		pet: user.pet,
		age: user.age,
		image: user.image,
		loading: false,
		error: false,
	});

	const onFormChange = event => {
		setValues({ ...values, error: false });
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

	const onProfileUpdate = async () => {
		const token = window.sessionStorage.getItem("token");
		if (!token) return;
		setValues({ ...values, loading: true });
		const { name, age, pet, image } = values;
		if (name === "" || pet === "" || age === "") {
			setValues({
				...values,
				error: true,
				name: user.name,
				pet: user.pet,
				age: user.age,
			});
			return;
		}
		const body = JSON.stringify({ name, age, pet, image });
		const resp = await fetch(`${API}/profile/${user.id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: token,
			},
			body,
		});
		const response = await resp.json();
		setValues({ ...values, loading: false });
		console.log(response);
		if (resp.status === 200 || resp.status === 304) {
			loadUser(response);
			toggleModal();
		}
	};

	return (
		<div className="profile-modal">
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 bg-white center">
				<main className="pa4 black-80 w-80">
					<img
						src={user.image === "" ? profile : user.image}
						className="h3 w3 dib"
						style={{ margin: "20px", cursor: "pointer" }}
						alt="avatar"
					/>
					<br />
					<h1>{values.name}</h1>
					<h4>Images submitted: {user.entries}</h4>
					<p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
					<hr />
					<form
						encType="multipart/form-data"
						className="measure"
						id="picture-form"
					>
						<label className="mt2 fw6" htmlFor="profile_pic">
							Change profile picture:
						</label>
						<input
							type="file"
							name="profilePic"
							id="profile_pic"
							onChange={event => {
								setValues({ ...values, loading: true, error: false });
								if (
									!event.target.files[0] ||
									event.target.files[0].size > 500 * 1024
								) {
									event.target.value = null;
									setValues({ ...values, error: true, loading: false });
									return;
								}
								let reader = new FileReader();
								reader.readAsDataURL(event.target.files[0]);
								reader.onload = () => {
									setValues({
										...values,
										image: reader.result,
										loading: false,
										error: false,
									});
									console.log(values);
								};
							}}
						/>
					</form>
					{values.error && (
						<p style={{ color: "red" }}>
							Name, Age and Pet cannot be empty, and image must be less than 500
							KB.
						</p>
					)}
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
						{values.loading ? (
							<Spinner />
						) : (
							<button
								onClick={e => {
									e.preventDefault();
									onProfileUpdate();
								}}
								className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
							>
								Save
							</button>
						)}
						{!values.loading && (
							<button
								onClick={toggleModal}
								className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
							>
								Cancel
							</button>
						)}
					</div>
				</main>
				{!values.loading && (
					<div className="modal-close" onClick={toggleModal}>
						&times;
					</div>
				)}
			</article>
		</div>
	);
};

export default Profile;
