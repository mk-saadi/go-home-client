import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
	const navigate = useNavigate();

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
						<NavLink to="/">Profile</NavLink>
						<NavLink to="/allApartment">Apartments</NavLink>
						<NavLink to="/bookedApartments">Booked</NavLink>
					</ul>
				</div>
			</div>

			<div>
				<button
					onClick={handleLogout}
					className="logOutButton"
				>
					logout
				</button>
			</div>
		</div>
	);
};

export default Navbar;
