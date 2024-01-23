import { useContext } from "react";
import { DataContent } from "../../utils/Providers";
import TopNav from "./homeComponent/TopNav";
import HouseList from "./homeComponent/HouseList";

const Home = () => {
	const { houses } = useContext(DataContent);

	return (
		<div className="h-[200vh]">
			<TopNav />

			<HouseList houses={houses} />
		</div>
	);
};

export default Home;
