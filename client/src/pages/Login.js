import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [waitForForm, setWaitForForm] = useState(false);
	const [checkError, setCheckError] = useState(false);
	const navigate = useNavigate();

	const login = async (event) => {
		event.preventDefault();
		setWaitForForm(true);

		try {
			if (!waitForForm) {
				const res = await fetch("http://localhost:5000/login", {
					method: "POST",
					headers: { "Content-type": "application/json" },
					body: JSON.stringify({ username, password }),
				});
				const data = await res.json();

				if (!data.success) {
					return showError(data.msg);
				}

				document.cookie = `token=${data.token}`;

				return navigate("/");
			}
		} catch (error) {
			return showError("Server is not responding properly");
		}
	};

	function showError(msg) {
		setCheckError(true);
		setErrorMsg(msg);
		setTimeout(() => {
			setCheckError(false);
			setWaitForForm(false);
		}, 2000);
	}

	return (
		<>
			<section>
				<div className="container-login">
					<form className="login-form" autoComplete="off">
						<h1 className="login-header">Login</h1>
						<input
							type="text"
							name="username"
							value={username}
							onChange={(event) => setUsername(event.target.value)}
							className="username"
							placeholder="Username"
						/>
						<input
							type="password"
							name="password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							className="password"
							placeholder="Password"
						/>
						{checkError && <p className="error">{`*${errorMsg}`}</p>}
						<input
							type="submit"
							name="login"
							value="Login"
							className="login-button"
							onClick={login}
						/>
					</form>
				</div>
			</section>
			<footer>
				<div className="container-disclaimer">
					<p className="disclaimer">
						Disclaimer: This website is only meant as a project so please do not
						enter any sensitive information
					</p>
				</div>
			</footer>
		</>
	);
}
