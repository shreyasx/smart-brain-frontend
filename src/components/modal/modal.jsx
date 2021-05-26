import React from "react";
import ReactDOM from "react-dom";
import "./modal.css";

const modalRoot = document.getElementById("modal-root");

class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.el = document.createElement("div");
	}

	componentWillUnmount() {
		modalRoot.removeChild(this.el);
	}

	componentDidMount() {
		modalRoot.appendChild(this.el);
	}

	render() {
		return ReactDOM.createPortal(this.props.children, this.el);
	}
}

export default Modal;
