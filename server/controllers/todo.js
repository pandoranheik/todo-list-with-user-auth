const pool = require("../db");

// Create a todo

const addTodo = async (req, res) => {
	try {
		const { description } = req.body;
		const user_id = req.user_id;

		const newTodo = await pool.query(
			`INSERT INTO todo (description, user_id) VALUES($1, $2)  RETURNING *`,
			[description, user_id]
		);

		res.status(200).json(newTodo.rows[0]);
	} catch (err) {
		console.log(err.message);
	}
};

// Get all todos

const getAllTodos = async (req, res) => {
	try {
		const user_id = req.user_id;

		const allTodos = await pool.query(
			"SELECT * FROM todo WHERE user_id = $1 ORDER BY todo_id ASC",
			[user_id]
		);
		res.status(200).json(allTodos.rows);
	} catch (err) {
		console.log(err.message);
	}
};

// Get a todo

const getTodo = async (req, res) => {
	try {
		// Get id
		const { todo_id } = req.params;
		// find todo with id
		const todo = await pool.query(
			"SELECT * FROM todo WHERE todo_id = $1 WHERE user_id = $2",
			[Number(todo_id), 1]
		);

		if (!todo.rows[0]) {
			return res.status(200).json({
				success: false,
				msg: `todo with id of ${todo_id} could not be found`,
			});
		}
		return res.status(200).json({ success: true, data: todo.rows[0] });
	} catch (err) {
		console.log(err.message);
	}
};

// Update a todo
const updateTodo = async (req, res) => {
	try {
		const { todo_id, description } = req.body;
		const user_id = req.user_id

		if (!todo_id) {
			return res.status(400).json({ success: false, msg: "Enter an id" });
		}

		const newTodo = await pool.query(
			"UPDATE todo SET description = $2 WHERE todo_id = $1 AND user_id = $3 RETURNING *",
			[todo_id, description, user_id]
		);

		if (!newTodo.rows[0]) {
			return res.status(400).json({
				success: false,
				msg: `todo with id of ${id} could not be found`,
			});
		}

		return res.status(200).json({ success: true, data: newTodo.rows[0] });
	} catch (err) {
		console.log(err.message);
	}
};

// delete a todo

const deleteTodo = async (req, res) => {
	try {
		const { todo_id } = req.query;
		const user_id = req.user_id

		const doesExist = await pool.query(
			"SELECT todo_id FROM todo WHERE todo_id = $1 AND user_id= $2",
			[todo_id, user_id]
		);

		if (!doesExist.rows[0]) {
			return res.status(400).json({
				success: false,
				msg: `todo with an id of ${todo_id} could not be found`,
			});
		}

		await pool.query("DELETE FROM todo WHERE todo_id = $1 AND user_id = $2", [
			todo_id,
			user_id,
		]);

		return res.status(201).json({
			success: true,
			msg: `todo with id of ${todo_id} was successfully deleted`,
		});
	} catch (err) {
		console.log(err.message);
	}
};

module.exports = { addTodo, deleteTodo, getAllTodos, getTodo, updateTodo };
