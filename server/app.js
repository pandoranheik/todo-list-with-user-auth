const express = require("express");
const cors = require("cors");
const routerTodo = require("./routes/todo");
const routerLogin = require("./routes/login");
const routerRegister = require("./routes/register");
// Create Express App
const app = express();

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use("/todos", routerTodo);
app.use("/login", routerLogin);
app.use("/register", routerRegister);

app.listen(5000, () => {
	console.log("Listening on port 5000..");
});
