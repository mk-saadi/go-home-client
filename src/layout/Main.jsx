import { Outlet } from "react-router-dom";

const Main = () => {
	localStorage.removeItem("email");

	return (
		<div>
			<Outlet />
		</div>
	);
};

export default Main;
