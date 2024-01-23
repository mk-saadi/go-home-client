import { LogOut } from "lucide-react";
import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { DataContent } from "../utils/Providers";

const Navbar = () => {
	const navigate = useNavigate();
	const { user } = useContext(DataContent);

	const handleLogout = (event) => {
		event.preventDefault();
		localStorage.removeItem("go-home-ISTJ");

		window.location.reload(true);
		navigate("/");
	};

	return (
		<div className="flex flex-row">
			<div className="hidden md:block">
				<Link to="/">
					<button>GoHome</button>
				</Link>
			</div>
			<div className="flex-grow">
				<div className="flex items-center justify-center">
					<ul className="flex space-x-4 font-medium text-gray-700 activeLinks">
						{user?.role !== "Renter" && <NavLink to="/dashboard/houseList">Dashboard</NavLink>}
						{user?.role !== "RentOut" && (
							<NavLink to="/dashboard/bookedApartments">Booked</NavLink>
						)}
						<NavLink to="/dashboard/allApartment">Apartments</NavLink>
					</ul>
				</div>
			</div>

			<div>
				<button
					onClick={handleLogout}
					className="flex items-center justify-start logOutButton gap-x-2"
				>
					<LogOut />
					logout
				</button>
			</div>
		</div>
	);
};

export default Navbar;
