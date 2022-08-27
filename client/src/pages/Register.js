import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [usernameExist, setUsernameExist] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [userCreated, setUserCreated] = useState(false);
	const [waitForForm, setWaitForForm] = useState(false);
	const navigate = useNavigate();

	const register = async (event) => {
		event.preventDefault();
		setWaitForForm(true);
		
		try {
			if (!waitForForm) {
				const res = await fetch("http://localhost:5000/register", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ username, password, confirmPassword }),
				});

				const data = await res.json();

				if (!data.success) {
					return showError(data.msg);
				}
				setUserCreated(true);
				setTimeout(() => {
					navigate("/login");
				}, 1000);
			}
		} catch {
			return showError("Server is not responding properly");
		}
	};

	function showError(error) {
		setUsernameExist((prevExist) => !prevExist);
		setErrorMsg(error);
		setTimeout(() => {
			setUsernameExist((prevExist) => !prevExist);
			setWaitForForm(false);
		}, 2000);
	}

	return (
		<>
			<section id="register">
				<div className="container-register">
					<form className="register-form" autoComplete="off">
						<h1 className="register-header">Register</h1>
						<input
							type="text"
							name="username"
							value={username}
							onChange={(event) => setUsername(event.target.value)}
							placeholder="Username"
							className="username"
						/>
						<input
							type="password"
							name="password"
							value={password}
							placeholder="Password"
							onChange={(event) => setPassword(event.target.value)}
							className="password"
						/>
						<input
							type="password"
							name="confirmPassword"
							placeholder="Confirm Password"
							value={confirmPassword}
							onChange={(event) => setConfirmPassword(event.target.value)}
							className="password"
						/>
						{usernameExist && <p className="error">{`*${errorMsg}`}</p>}
						{userCreated && <p className="created">*User has been created!"</p>}
						<input
							type="submit"
							className="register-button"
							onClick={register}
							value="Register"
						/>
					</form>
				</div>
			</section>
			<footer>
				<div className="container-disclaimer">
					<p className="disclaimer">
						Disclaimer: This website is only meant as a project so please do not
						enter any sensitive information{" "}
					</p>
				</div>
			</footer>
		</>
	);
}
