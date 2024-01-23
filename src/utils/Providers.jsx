import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const DataContent = createContext();

// eslint-disable-next-line react/prop-types
const Providers = ({ children }) => {
	const userId = localStorage.getItem("go-home-ISTJ");
	const [loading, setLoading] = useState(true);

	const [users, setUsers] = useState([]);
	const [user, setUser] = useState([]);
	const [houses, setHouses] = useState([]);
	const [booked, setBooked] = useState([]);

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
				console.log(error);
			}
		};
		fetchData();
	}, [userId]);

	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			try {
				const res = await axios.get("http://localhost:15000/houses");
				if (res.status === 200) {
					setLoading(false);
					const data = res.data;
					setHouses(data);
				}
			} catch (error) {
				console.log();
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			try {
				const res = await axios.get("http://localhost:15000/booked");
				if (res.status === 200) {
					setLoading(false);
					const data = res.data;

					const sameUser = data.filter((us) => us.bookerId === userId);
					const sameId = sameUser.map((sa) => sa.bookmark);
					const matchingIds = sameId;

					const matchingHouse = houses.filter((ho) => matchingIds.includes(ho._id));

					setBooked(matchingHouse);
				}
			} catch (error) {
				console.log();
			}
		};
		fetchData();
	}, [userId, houses]);

	const data = {
		users,
		houses,
		user,
		loading,
		booked,
	};
	return <DataContent.Provider value={data}>{children}</DataContent.Provider>;
};

export default Providers;
