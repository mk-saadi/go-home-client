import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
const Main = () => {
	localStorage.removeItem("email");

	return (
		<div>
			<Navbar />
			<div>
				<Outlet />
			</div>
		</div>
	);
};

export default Main;
