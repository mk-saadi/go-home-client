import TopNav from "./homeComponent/TopNav";
import HouseList from "./homeComponent/HouseList";

const Home = () => {
	return (
		<div className="bg-white">
			<TopNav />

			<HouseList />
		</div>
	);
};

export default Home;
