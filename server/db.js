require("dotenv").config();
const pg = require("pg").Pool;

const pool = new pg({
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_ACCESS_KEY,
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
	database: process.env.DATABASE_NAME
});

module.exports = pool;
