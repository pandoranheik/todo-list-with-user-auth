const express = require("express");
const router = express.Router();
const { login, loginIdChecker } = require("../controllers/login");
const { authenticateToken } = require("../services/authenticateToken");

router.route("/").post(login).get(authenticateToken, loginIdChecker);

module.exports = router;
