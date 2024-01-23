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
		path: "/dashboard",
		element: (
			<PrivateRoute>
				<Main />
			</PrivateRoute>
		),
		children: [
			{
				path: "/dashboard/houseList",
				element: <Home />,
			},
			{
				path: "/dashboard/:id",
				element: <ApartmentDetail />,
			},
			{
				path: "/dashboard/edit/:id",
				element: <EditApartment />,
			},
			{
				path: "/dashboard/allApartment",
				element: <AllApartment />,
			},
			{
				path: "/dashboard/bookedApartments",
				element: <BookedApartments />,
			},
			{
				path: "/dashboard/exp",
				element: <Exp />,
			},
		],
	},
	{
		path: "/",
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
