const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) return res.status(401).json({ success: false });

	jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user_id) => {
		if (err)
			return res
				.status(401)
				.json({ success: false, msg: "Session has expired" });

		req.user_id = user_id.id;
		next();
	});
}

module.exports = { authenticateToken };
