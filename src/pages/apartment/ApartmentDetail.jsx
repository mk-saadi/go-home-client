import axios from "axios";
import { useEffect, useState, Fragment, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "../../utils/Typography";
import { BookMarked } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import Toast from "../../utils/Toast";
import { MoveLeft } from "lucide-react";
import useToast from "../../utils/useToast";
import { DataContent } from "../../utils/Providers";

const ApartmentDetail = () => {
	const { id } = useParams();
	const [room, setRoom] = useState([]);
	const { toastType, toastMessage, showToast, hideToast } = useToast();
	const { user } = useContext(DataContent);

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

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(`http://localhost:15000/houses/${id}`);
				if (res.status === 200) {
					setRoom(res.data);
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchData();
	}, [id]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const form = event.target;
		const name = user.name;
		const email = user.email;
		const phoneNumber = form.phoneNumber.value;

		const bookedRoom = {
			name,
			email,
			phoneNumber,
			id,
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

	let [isOpen, setIsOpen] = useState(false);
	function closeModal() {
		setIsOpen(false);
	}
	function openModal() {
		setIsOpen(true);
	}

	const navigate = useNavigate();

	const handleBack = () => {
		navigate(-1);
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

			<div className="py-2 mx-3 md:px-8 md:mx-auto xl:max-w-6xl lg:max-w-5xl md:max-w-4xl">
				<div className="flex items-center justify-start gap-x-3">
					{room?.imageUrls &&
						room?.imageUrls.map((image, index) => (
							<img
								key={index}
								src={image}
								className="object-cover h-56 border border-orange-400 rounded-md w-72"
								alt={`Image ${index}`}
							/>
						))}
				</div>
				<div>
					<div className="flex justify-between mb-8">
						<div>
							<p className="text-xl font-semibold text-gray-700">{room.houseName}</p>
							<p className="text-sm font-medium text-gray-500">{room.city}</p>
							<p className="text-sm font-medium text-gray-500">BDT: ৳{room.rent}</p>
							<p className="text-sm font-medium text-gray-500">
								Available from: {room.availability}
							</p>
						</div>

						<div className="w-fit">
							<button
								className="flex items-center justify-start submitButton gap-x-2"
								onClick={openModal}
							>
								{" "}
								<BookMarked />
								Book now
							</button>
						</div>
					</div>

					<Typography content={room.description} />

					<div className="mt-8 w-fit">
						<button
							className="goBack"
							onClick={handleBack}
						>
							<MoveLeft />
						</button>
					</div>
				</div>
			</div>

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

export default ApartmentDetail;
