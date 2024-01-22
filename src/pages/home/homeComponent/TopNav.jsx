import { useContext } from "react";
import { DataContent } from "../../../utils/Providers";

const TopNav = () => {
	const { houses, users } = useContext(DataContent);
	console.log("users: ", users);
	console.log("houses: ", houses);
	return (
		<div>
			<p>something</p>
		</div>
	);
};

export default TopNav;
