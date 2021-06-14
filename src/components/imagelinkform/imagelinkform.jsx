import React, { useState } from "react";
import "./imagelinkform.css";

const imageLink =
	"https://st.depositphotos.com/1008939/1906/i/600/depositphotos_19066015-stock-photo-mosaic-people-portraits.jpg";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	const [copied, setCopied] = useState(false);

	return (
		<div className="ma4 mt0">
			<p className="f3" style={{ width: "80%", margin: "20px auto" }}>
				This Magic Brain will detect faces in your pictures. Give it a Try!{" "}
				<br />
				Click the button below to copy a link to clipboard, just to try the app.
			</p>
			<a
				onClick={event => {
					event.preventDefault();
					navigator.clipboard.writeText(imageLink);
					setCopied(true);
				}}
				className="f6 grow no-underline br-pill ba bw2 ph3 pv2 mb2 dib dark-green"
				href="#0"
			>
				COPY A LINK TO CLIPBOARD!
			</a>
			<div className="center">
				<div className="form center pa4 br3 shadow-5">
					<input
						onChange={onInputChange}
						className="f4 pa2 w-70 center"
						type="text"
						placeholder={
							copied ? "Link copied, now paste it here." : "Enter image link."
						}
					/>
					<button
						onClick={onButtonSubmit}
						className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
					>
						DETECT
					</button>
				</div>
			</div>
		</div>
	);
};

export default ImageLinkForm;
