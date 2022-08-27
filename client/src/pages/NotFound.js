import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
	const navigate = useNavigate();
	setTimeout(() => {
		navigate(-1);
	}, 1000);
    
	return (
		<div className="notFound">
			<div className="notFound-container">
				<h1>Page Not Found</h1>
				<h1>Redirecting...</h1>
			</div>
		</div>
	);
}
