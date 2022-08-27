const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		const checkLogin = await pool.query(
			"SELECT * FROM users WHERE UPPER(username) = $1",
			[username.toUpperCase()]
		);

		const user = checkLogin.rows;

		if (!username || !password) {
			return res
				.status(401)
				.json({ success: false, msg: "Username or password field missing" });
		}

		if (user.length === 0) {
			return res.status(401).json({
				success: false,
				validUsername: false,
				msg: "Invalid username",
			});
		}

		const checkPassword = await bcrypt.compare(password, user[0].password);

		const user_id = { id: user[0].user_id };

		if (checkPassword) {
			const userToken = jwt.sign(user_id, process.env.ACCESS_SECRET_TOKEN, {
				expiresIn: "1h",
			});
			return res.status(200).json({
				success: true,
				token: userToken,
			});
		} else {
			return res.status(401).json({
				success: false,
				validPassword: false,
				msg: "Incorrect password",
			});
		}
	} catch (error) {
		return res.status(500).json({ success: false, msg: error.message });
	}
};

const loginIdChecker = async (req, res) => {
	const user_id = req.user_id;

	const response = await pool.query(
		"SELECT user_id FROM users WHERE user_id = $1",
		[user_id]
	);

	if (response.rows.length === 0) {
		return res.status(401).json({ success: false });
	}

	return res.status(200).json({ success: true });
};

module.exports = { login, loginIdChecker };
