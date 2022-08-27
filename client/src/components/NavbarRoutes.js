import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function NavbarRoutes() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Navbar />}></Route>
				<Route path="/register" element={<Navbar />}></Route>
				<Route path="/login" element={<Navbar />}></Route>
				<Route path="/expired" element={<></>}></Route>
			</Routes>
		</>
	);
}
