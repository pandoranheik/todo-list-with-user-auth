import Todos from "./pages/Todos";
import React from "react";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import NavbarRoutes from "./components/NavbarRoutes";
import Login from "./pages/Login";
import Expired from "./pages/Expired";

function App() {
	return (
		<>
			<NavbarRoutes />
			<Routes>
				<Route index element={<Todos />}></Route>
				<Route path="/register" element={<Register />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/expired" element={<Expired />}></Route>
				<Route path="*" element={<NotFound />}></Route>
			</Routes>
		</>
	);
}

export default App;
