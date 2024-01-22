import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const DataContent = createContext();

// eslint-disable-next-line react/prop-types
const Providers = ({ children }) => {
	const [users, setUsers] = useState([]);
	const [houses, setHouses] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get("http://localhost:15000/users");
				if (res.status === 200) {
					const data = res.data;
					setUsers(data);
				}
			} catch (error) {
				console.log();
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get("http://localhost:15000/houses");
				if (res.status === 200) {
					const data = res.data;
					setHouses(data);
				}
			} catch (error) {
				console.log();
			}
		};
		fetchData();
	}, []);

	const data = {
		users,
		houses,
	};
	return <DataContent.Provider value={data}>{children}</DataContent.Provider>;
};

export default Providers;
