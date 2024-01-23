import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layout/Main";
import Home from "./pages/home/Home";
import ApartmentDetail from "./pages/apartment/ApartmentDetail";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PrivateRoute from "./utils/PrivateRoute";
import Providers from "./utils/Providers";
import EditApartment from "./pages/apartment/EditApartment";
import AllApartment from "./pages/apartment/AllApartment";
import BookedApartments from "./pages/apartment/BookedApartments";
import Exp from "./pages/apartment/Exp";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<PrivateRoute>
				<Main />
			</PrivateRoute>
		),
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/:id",
				element: <ApartmentDetail />,
			},
			{
				path: "/edit/:id",
				element: <EditApartment />,
			},
			{
				path: "/allApartment",
				element: <AllApartment />,
			},
			{
				path: "/bookedApartments",
				element: <BookedApartments />,
			},
			{
				path: "/exp",
				element: <Exp />,
			},
		],
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Providers>
			<RouterProvider router={router} />
		</Providers>
	</React.StrictMode>
);
