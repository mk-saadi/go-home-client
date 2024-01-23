import TopNav from "./homeComponent/TopNav";
import HouseList from "./homeComponent/HouseList";

const Home = () => {
	return (
		<div className="h-[200vh]">
			<TopNav />

			<HouseList />
		</div>
	);
};

export default Home;
