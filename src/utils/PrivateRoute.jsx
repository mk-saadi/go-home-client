import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const go_home = localStorage.getItem("go-home-ISTJ");
	console.log("go_home: ", go_home);
	const location = useLocation();

	useEffect(() => {
		setLoading(false);
	}, []);

	if (loading) {
		return (
			<div className="flex flex-col items-center justify-center h-screen">
				<span className="w-32 h-32 loading loading-spinner"></span>
				<p className="text-5xl">Please wait...</p>
			</div>
		);
	}

	if (!go_home) {
		// Redirect the user to the login page if their social_id address does not exist
		return (
			<Navigate
				state={{ from: location }}
				to="/login"
				replace
			></Navigate>
		);
	}

	// Return the children component if the user is logged in
	return children;
};

export default PrivateRoute;
