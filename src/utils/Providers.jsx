import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const DataContent = createContext();

const Providers = ({ children }) => {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState([]);
	const [houses, setHouses] = useState([]);
	const userId = localStorage.getItem("go-home-ISTJ");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get("http://localhost:15000/users");
				if (res.status === 200) {
					const data = res.data;
					const sameUser = data.find((us) => us._id === userId);
					setUser(sameUser);
					setUsers(data);
				}
			} catch (error) {
				console.log();
			}
		};
		fetchData();
	}, [userId]);

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
		user,
	};
	return <DataContent.Provider value={data}>{children}</DataContent.Provider>;
};

export default Providers;
