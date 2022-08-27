import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
	const userToken = document.cookie.split("=")[1];
	const [showRequired, setShowRequired] = useState(false);

	const error = (event) => {
		const authenticateUser = async (token) => {
			const res = await fetch(`http://localhost:5000/login`, {
				method: "GET",
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await res.json();

			if (!data.success && showRequired === false) {
				event.preventDefault();
				setShowRequired(true);
				setTimeout(() => {
					setShowRequired(false);
				}, 1500);
				return;
			} else if (showRequired) {
				event.preventDefault();
			}
		};
		authenticateUser(userToken);
	};

	const signOut = () => {
		document.cookie.split(";").forEach((c) => {
			document.cookie = c
				.replace(/^ +/, "")
				.replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
		});
	};

	return (
		<nav>
			<div className="nav-container">
				<div className="nav-logo">
					<h3>Todo List</h3>
				</div>

				<div className="nav-links">
					<NavLink to="/" className="link" onClick={error}>
						Todos
					</NavLink>
					{!userToken ? (
						<>
							<NavLink to="/login" className="link">
								Login
							</NavLink>
							<NavLink to="/register" className="link">
								Register
							</NavLink>
						</>
					) : (
						<NavLink to="/login" className="link" onClick={signOut}>
							Signout
						</NavLink>
					)}
				</div>
			</div>
			<div className="nav-block"></div>
			{showRequired && (
				<p className="error required">*Login required to access this page</p>
			)}
		</nav>
	);
}
