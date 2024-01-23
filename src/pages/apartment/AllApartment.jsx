import { useContext, useState, Fragment } from "react";
import { DataContent } from "../../utils/Providers";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { BookMarked, CircleSlash, Loader, MoveLeft, Search } from "lucide-react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import useToast from "../../utils/useToast";
import Toast from "../../utils/Toast";

const AllApartment = () => {
	const { houses, loading, user } = useContext(DataContent);
	const { toastType, toastMessage, showToast, hideToast } = useToast();

	const [searchQuery, setSearchQuery] = useState("");

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};
	const filteredItems = houses?.filter((it) => it.city.toLowerCase().includes(searchQuery.toLowerCase()));

	const [userInput, setUserInput] = useState("+880");

	const handleInputChange = (e) => {
		let input = e.target.value;

		input = input.replace(/[^0-9+]/g, "");

		if (!input.startsWith("+880")) {
			setUserInput("+880");
		} else {
			setUserInput(input);
		}
	};

	const [bookmark, setBookmark] = useState(null);
	let [isOpen, setIsOpen] = useState(false);
	function closeModal() {
		setIsOpen(false);
	}
	function openModal(roomId) {
		setBookmark(roomId);
		setIsOpen(true);
	}

	const handleSubmit = async (event) => {
		event.preventDefault();

		const form = event.target;
		const name = user?.name;
		const email = user?.email;
		const id = user?._id;
		const phoneNumber = form.phoneNumber.value;

		const bookedRoom = {
			name,
			email,
			bookerId: id,
			phoneNumber,
			bookmark,
		};

		try {
			const res = await axios.post("http://localhost:15000/booked", bookedRoom);
			if (res.data) {
				showToast("success", "Successfully booked apartment!");
				setIsOpen(false);
			}
		} catch (error) {
			showToast("error", "Couldn't book this apartment. Please try again!");
		}
	};

	return (
		<>
			{toastType && (
				<Toast
					type={toastType}
					message={toastMessage}
					onHide={hideToast}
				/>
			)}

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
						<div>
							<CircleSlash />
						</div>
						<p className="text-lg font-semibold leading-6 text-gray-700">Empty list.</p>
						<p>
							<small className="font-medium leading-5 text-gray-500 truncate">
								No one put any apartment for rent.
							</small>
						</p>
					</div>
				</div>
			) : (
				<div className="py-2 mx-3 border-t md:px-8 md:mx-auto xl:max-w-6xl lg:max-w-5xl md:max-w-4xl border-amber-900/30">
					<Fade
						damping={0.3}
						cascade
						triggerOnce
						role="list"
						className="py-2 mx-3 space-y-2 divide-y divide-gray-100 md:mx-0"
					>
						<div className="relative w-full">
							<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<span className="text-[#645104] sm:text-sm">
									<Search />
								</span>
							</div>
							<input
								type="text"
								className="block w-full rounded-none border-0 py-1.5 text-gray-700 shadow-md ring-1 ring-inset ring-[#645104] placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none px-2 font-semibold placeholder:ml-12 pl-12"
								placeholder="Search by city"
								value={searchQuery}
								onChange={handleSearchChange}
							/>
						</div>
						{(searchQuery.length === 0 ? houses : filteredItems).length === 0 ? (
							<div className="flex items-center justify-center h-full px-4 py-2 mx-auto border max-w-prose bg-gray-200/70 border-yellow-900/20">
								<p className="text-lg font-semibold leading-6 text-gray-700">
									No Apartment found.
								</p>
							</div>
						) : (
							(searchQuery.length === 0 ? houses : filteredItems).map((us) => (
								<li
									key={us._id}
									className="flex justify-between px-4 pt-2 my-1 duration-200 bg-gray-200/70 gap-x-6 hover:bg-amber-50 group"
								>
									<div className="flex justify-between w-full pb-2 border-b border-yellow-900/20">
										<div className="flex min-w-0 gap-x-4">
											<div className="flex-auto min-w-0">
												<div className="flex items-center justify-start gap-3">
													<Link
														to={`/${us._id}`}
														className="overflow-hidden"
													>
														<img
															src={us.imageUrls[0]}
															alt=""
															className="object-cover duration-700 h-28 w-36 group-hover:scale-110"
														/>
													</Link>
													<div>
														<Link to={`/${us._id}`}>
															<p className="text-base font-semibold text-gray-700 hover:underline">
																{us.houseName}
															</p>
														</Link>

														<div className="flex mt-1 text-xs gap-x-1.5 font-medium leading-5 text-gray-500 truncate">
															House Owner:{" "}
															<div className="flex items-center justify-start gap-x-1">
																<img
																	src={us.uploaderImage}
																	className="object-cover w-5 h-5"
																	alt="house Owner"
																/>
																<p>{us.uploaderName}</p>
															</div>
														</div>
														<p className="text-xs font-medium text-gray-500">
															Rent: ৳{us.rent}/m
														</p>
													</div>
												</div>
											</div>
										</div>
										<div className="flex flex-col items-end justify-center">
											<p className="mb-1.5 hidden text-sm font-semibold leading-6 text-gray-700 md:block">
												City: <span className="text-gray-500">{us?.city}</span>
											</p>

											<div className="flex flex-col items-center justify-center md:gap-y-0 gap-y-3 md:flex-row w-fit h-fit gap-x-2">
												<button
													className="flex items-center justify-start submitButton gap-x-2"
													onClick={() => openModal(us._id)}
												>
													{" "}
													<BookMarked />
													Book now
												</button>
											</div>
										</div>
									</div>
								</li>
							))
						)}
					</Fade>
				</div>
			)}

			{/* modal */}
			<Transition
				appear
				show={isOpen}
				as={Fragment}
			>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={closeModal}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex items-center justify-center min-h-full p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-xl p-6 overflow-hidden overflow-y-auto text-left align-middle transition-all transform bg-white rounded-none shadow-xl">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900"
									>
										Book this apartment?
									</Dialog.Title>

									{/* modal body below */}
									<div className="mt-2">
										<form onSubmit={handleSubmit}>
											{/* user Name */}
											<div>
												<label
													htmlFor="userName"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													Your name
												</label>
												<div className="mt-1">
													<input
														id="userName"
														type="text"
														readOnly
														name="userName"
														className="block w-full rounded-none border-0 py-1.5 text-gray-700 shadow-md ring-1 ring-inset ring-[#645104] placeholder:text-gray-400 sm:text-base sm:leading-6 focus:outline-none px-2 font-semibold"
														required
														defaultValue={user.name}
													/>
												</div>
											</div>
											{/* user email */}
											<div>
												<label
													htmlFor="userEmail"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													Your email
												</label>
												<div className="mt-1">
													<input
														id="userEmail"
														type="email"
														readOnly
														name="userEmail"
														className="block w-full rounded-none border-0 py-1.5 text-gray-700 shadow-md ring-1 ring-inset ring-[#645104] placeholder:text-gray-400 sm:text-base sm:leading-6 focus:outline-none px-2 font-semibold"
														required
														defaultValue={user.email}
													/>
												</div>
											</div>

											{/* user Name */}
											<div>
												<label
													htmlFor="phoneNumber"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													Your phone number
												</label>
												<div className="mt-1">
													<input
														id="phoneNumber"
														type="tel"
														name="phoneNumber"
														className="block w-full rounded-none border-0 py-1.5 text-gray-700 shadow-md ring-1 ring-inset ring-[#645104] placeholder:text-gray-400 sm:text-base sm:leading-6 focus:outline-none px-2 font-semibold"
														required
														pattern="^\+880[1-9][0-9]{9}$"
														title="Please enter a valid Bangladeshi phone number starting with +880"
														value={userInput}
														onChange={handleInputChange}
													/>
												</div>
											</div>

											<div className="flex justify-between w-full mt-4 col-span-full gap-x-12">
												<div className="w-full">
													<button
														type="button"
														className="flex justify-center goBack"
														onClick={closeModal}
													>
														<MoveLeft />
													</button>
												</div>

												<input
													type="submit"
													value="Book now"
													className="submitButton"
												/>
											</div>
										</form>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default AllApartment;
