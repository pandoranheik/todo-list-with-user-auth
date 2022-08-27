import React from "react";

export default function ListTodo(props) {
	return (
		<>
			<div className="container-list">
				<p>{props.description}</p>
				<div className="container-buttons">
					<p className="edit" onClick={props.handleEdit}>
						Edit
					</p>
					|
					<p className="delete" onClick={props.handleDelete}>
						Delete
					</p>
				</div>
			</div>
			<div className="line"></div>
		</>
	);
}
