const express = require("express");
const { authenticateToken } = require("../services/authenticateToken");
const router = express.Router();
const {
	addTodo,
	deleteTodo,
	getAllTodos,
	getTodo,
	updateTodo,
} = require("../controllers/todo");

router
	.route("/")
	.post(authenticateToken, addTodo)
	.get(authenticateToken, getAllTodos)
	.put(authenticateToken, updateTodo)
	.delete(authenticateToken, deleteTodo);

router.route("/:todo_id").get(getTodo);

module.exports = router;
