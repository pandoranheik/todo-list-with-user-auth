import React from "react";
import { useNavigate } from "react-router-dom";

export default function Expired() {
	const navigate = useNavigate();
	const redirect = (event) => {
		navigate("/login");
	};
	return (
		<div className="container-expired">
			<h1>Your session has expired</h1>
			<button type="button" onClick={redirect} className="expired-button">
				Redirect
			</button>
		</div>
	);
}
