import { Link, useNavigate } from "react-router-dom";

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
			<div>
				<Link to="/">
					<button>GoHome</button>
				</Link>
			</div>

			<div className="flex-grow">
				<div className="flex items-center justify-center">
					<ul className="flex space-x-2">
						<li>nav links 0</li>
						<li>nav links 1</li>
						<li>nav links 2 </li>
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
