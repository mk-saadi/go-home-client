import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();

	const handleLogout = (event) => {
		event.preventDefault();
		localStorage.removeItem("go-home-ISTJ");

		window.location.reload(true);
		navigate("/");
	};

	return (
		<div>
			<button onClick={handleLogout}>logout</button>
		</div>
	);
};

export default Home;
