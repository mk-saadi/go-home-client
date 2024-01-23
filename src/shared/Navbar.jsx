import { LogOut } from "lucide-react";
import { useContext, useEffect, useState } from "react";
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

	const [showLinks, setShowLinks] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setShowLinks(true);
		}, 1500);

		return () => clearTimeout(timeout);
	}, []);

	return (
		<div className="flex flex-row mx-1.5 md:mx-6 bg-white border-b border-amber-900/30">
			<div className="hidden md:block">
				{showLinks && (
					<>
						{user?.role !== "Renter" && (
							<Link to="/dashboard/houseList">
								<button className="font-semibold text-lg text-[#c59e00]">HouseHunter</button>
							</Link>
						)}

						{user?.role !== "RentOut" && (
							<Link to="/dashboard/bookedApartments">
								<button className="font-semibold text-lg text-[#c59e00]">HouseHunter</button>
							</Link>
						)}
					</>
				)}
			</div>

			<div className="flex-grow">
				<div className="flex items-center justify-center">
					{showLinks && (
						<ul className="flex space-x-4 font-medium text-gray-700 activeLinks">
							{user?.role !== "Renter" && (
								<NavLink to="/dashboard/houseList">Dashboard</NavLink>
							)}
							{user?.role !== "RentOut" && (
								<NavLink to="/dashboard/bookedApartments">Booked</NavLink>
							)}
							<NavLink to="/dashboard/allApartment">Apartments</NavLink>
						</ul>
					)}
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
