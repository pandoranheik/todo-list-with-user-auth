const pool = require("../db");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const register = async (req, res) => {
	try {
		const { username, password, confirmPassword } = req.body;
		const checkUsername = await pool.query(
			"SELECT * FROM users WHERE UPPER(username) = $1",
			[username.toUpperCase()]
		);

		if (!username || !password) {
			return res
				.status(200)
				.json({ success: false, msg: "Username or password field missing" });
		}

		if (username.includes(" ")) {
			return res.status(200).json({
				success: false,
				msg: "Username cannot contain any whitespace",
			});
		}

		if (password !== confirmPassword) {
			return res
				.status(200)
				.json({ success: false, msg: "Passwords do not match" });
		}

		if (password.length !== 8) {
			return res.status(200).json({
				success: false,
				msg: "Password must contain 8 or more characters",
			});
		}

		if (checkUsername.rows.length === 0) {
			const hashedPassword = await bcrypt.hash(password, 10);

			// Creates user
			await pool.query(
				"INSERT INTO users(user_id,username, password) VALUES($1, $2, $3) RETURNING *",
				[uuidv4(), username, hashedPassword]
			);

			return res.status(201).json({ success: true });
		} else {
			return res.status(200).json({
				success: false,
				doesUsernameExist: true,
				msg: "Username has been taken",
			});
		}
	} catch (error) {
		return res.status(500).json({ success: false, msg: error.message });
	}
};

module.exports = { register };
