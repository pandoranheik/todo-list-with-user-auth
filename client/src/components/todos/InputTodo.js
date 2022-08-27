import React from "react";

export default function InputTodo(props) {
	return (
		<>
			<div className="container-form">
				<form className="input-form" autoComplete="off">
					<input
						type="text"
						value={props.description}
						name="addTodo"
						onChange={(event) => props.setDescription(event.target.value)}
					/>
					<button
						className="add"
						onClick={(event) =>
							props.addTodo(event, props.description, props.setDescription)
						}
					>
						Add Todo
					</button>
				</form>
			</div>
		</>
	);
}
