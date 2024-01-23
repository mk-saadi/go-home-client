import { useContext, useState } from "react";
import { DataContent } from "../../utils/Providers";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { Loader, User, UserX } from "lucide-react";

const Exp = () => {
	const { loading, houses } = useContext(DataContent);
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};
	const filteredItems = houses?.filter((it) => it.city.toLowerCase().includes(searchQuery.toLowerCase()));

	return (
		<>
			<div>
				<input
					type="text"
					className="block w-full rounded-none border-0 py-1.5 text-gray-700 shadow-md ring-1 ring-inset ring-[#645104] placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none px-2 font-semibold placeholder:ml-12 pl-12"
					required
					placeholder="search user by name"
					value={searchQuery}
					onChange={handleSearchChange}
				/>
			</div>

			{loading ? (
				<div className="h-[80vh]">
					<div className="flex flex-col items-center justify-center overflow-y-hidden text-[#a16c46]">
						<Loader className="w-20 h-20 animate-spin" />
						<p className="text-xl font-semibold">Loading...</p>
					</div>
				</div>
			) : houses.length === 0 ? (
				<div className="flex items-center justify-center h-full px-4 py-2 mx-auto border max-w-prose bg-gray-200/70 border-yellow-900/20">
					<div className="flex flex-col items-center justify-center">
						<div>UserX</div>
						<p className="text-lg font-semibold leading-6 text-gray-700">
							looks like there are no users.
						</p>
						<p>
							<small className="font-medium leading-5 text-gray-500 truncate">
								Click on the floating button below to add new user to database.
							</small>
						</p>
					</div>
				</div>
			) : (
				<div className="mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
					<Fade
						damping={0.3}
						cascade
						triggerOnce
						role="list"
						className="py-2 mx-3 space-y-2 divide-y divide-gray-100 md:mx-0"
					>
						{(searchQuery.length === 0 ? houses : filteredItems).length === 0 ? (
							<div className="flex items-center justify-center h-full px-4 py-2 mx-auto border max-w-prose bg-gray-200/70 border-yellow-900/20">
								<p className="text-lg font-semibold leading-6 text-gray-700">
									No users found.
								</p>
							</div>
						) : (
							(searchQuery.length === 0 ? houses : filteredItems).map((us) => (
								<li
									key={us._id}
									className="flex justify-between px-4 pt-2 my-1 duration-200 bg-gray-200/70 gap-x-6 hover:bg-gray-300/70"
								>
									<div className="flex justify-between w-full pb-2 border-b border-yellow-900/20">
										<div className="flex min-w-0 gap-x-4">
											<div className="flex-auto min-w-0">
												<div className="flex items-center justify-start gap-3">
													<Link to={`/userDetail/${us._id}`}>
														<User className="w-10 h-10 text-gray-700" />
													</Link>
													<div>
														<Link to={`/userDetail/${us._id}`}>
															<p className="text-sm font-semibold leading-6 text-gray-700 hover:underline">
																{us.houseName}
															</p>
														</Link>

														<p className="text-xs font-medium leading-5 text-gray-500 truncate">
															{us.uploaderName}
														</p>
														<p className="text-xs font-medium leading-5 text-gray-500 truncate">
															Phone: {us.phone}
														</p>
													</div>
												</div>
											</div>
										</div>
										<div className="flex flex-col items-end">
											<p className="hidden text-sm font-semibold leading-6 text-gray-700 md:block">
												City by: <span className="text-gray-500">{us?.city}</span>
											</p>

											<div className="flex flex-col gap-4 md:flex-row ">
												<Link to={`/editUser/${us._id}`}>
													<label
														htmlFor="editUser"
														className="sr-only"
													>
														Edit user?
													</label>
													<button
														id="editUser"
														className="submitButton"
														title="edit user info?"
													>
														Pencil
													</button>
												</Link>
												<div className="z-10">
													<label
														htmlFor="deleteUser"
														className="sr-only"
													>
														Delete user?
													</label>
													<button
														id="deleteUser"
														className="logOutButton"
														title="delete user?"
														// onClick={() => openModal(us._id)}
													>
														Eraser
													</button>
												</div>
											</div>
										</div>
									</div>
								</li>
							))
						)}
					</Fade>
				</div>
			)}
		</>
	);
};

export default Exp;
