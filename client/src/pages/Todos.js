import InputTodo from "../components/todos/InputTodo";
import ListTodo from "../components/todos/ListTodo";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Todos() {
	const [todos, setTodos] = useState([]);
	const [description, setDescription] = useState("");
	const userToken = document.cookie.split("=")[1];
	const navigate = useNavigate();

	useEffect(() => {
		const authenticateUser = async (token) => {
			const res = await fetch(`http://localhost:5000/login`, {
				method: "GET",
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await res.json();
			if (!data.success) {
				document.cookie.split(";").forEach((c) => {
					document.cookie = c
						.replace(/^ +/, "")
						.replace(
							/=.*/,
							"=;expires=" + new Date().toUTCString() + ";path=/"
						);
				});
				return navigate("/register");
			}
			return getTodos();
		};

		authenticateUser(userToken);

		// eslint-disable-next-line
	}, []);

	const authorize = async (token) => {
		const res = await fetch(`http://localhost:5000/login`, {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await res.json();
		if (!data.success) {
			document.cookie.split(";").forEach((c) => {
				document.cookie = c
					.replace(/^ +/, "")
					.replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
			});
			return navigate("/expired");
		}
	};

	function getTodos() {
		fetch(`http://localhost:5000/todos`, {
			method: "GET",
			headers: { Authorization: `Bearer ${userToken}` },
		})
			.then((res) => res.json())
			.then((data) => setTodos(data));
	}

	const listOfTodos = todos.map((todo) => {
		return (
			<ListTodo
				key={todo.todo_id}
				description={todo.description}
				handleDelete={(event) => handleDelete(event, todo.todo_id)}
				handleEdit={(event) => handleEdit(event, todo.todo_id)}
			/>
		);
	});

	// Either add an onSubmit or onClick to to add form to database
	const addTodo = async (event, description, setDescription) => {
		event.preventDefault();
		authorize(userToken);
		try {
			if (description) {
				await fetch("http://localhost:5000/todos", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userToken}`,
					},
					body: JSON.stringify({ description }),
				});
			}
			getTodos();
			return setDescription("");
		} catch (err) {
			console.log(err.message);
		}
	};

	const handleDelete = async (event, todo_id) => {
		authorize(userToken);
		try {
			await fetch(`http://localhost:5000/todos?todo_id=${todo_id}`, {
				method: "DELETE",
				headers: { Authorization: `Bearer ${userToken}` },
			});
			return getTodos();
		} catch (err) {
			console.log(err.message);
		}
	};

	const handleEdit = async (event, todo_id) => {
		authorize(userToken);
		try {
			if (description) {
				await fetch("http://localhost:5000/todos", {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userToken}`,
					},
					body: JSON.stringify({
						todo_id: todo_id,
						description: description,
					}),
				});
			}
			return getTodos();
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<>
			<main>
				{userToken && (
					<div className="wrapper">
						<div className="container">
							<h1 className="todoHeader">Todo List</h1>
							<InputTodo
								addTodo={addTodo}
								description={description}
								setDescription={setDescription}
							/>
							<div className="container-list">
								<h3>Todos</h3>
								<div className="container-buttons">
									<h3>Options</h3>
								</div>
							</div>
							<div className="line-header"></div>
							{listOfTodos}
						</div>
					</div>
				)}
			</main>
		</>
	);
}
