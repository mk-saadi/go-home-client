import { useContext, Fragment, useState } from "react";
import { DataContent } from "../../../utils/Providers";
import { Dialog, Transition } from "@headlessui/react";
import useToast from "../../../utils/useToast";
import Toast from "../../../utils/Toast";
import { MoveLeft, PlusSquare } from "lucide-react";
import axios from "axios";
import imageCompression from "browser-image-compression";

const TopNav = () => {
	const { toastType, toastMessage, showToast, hideToast } = useToast();

	const { houses, user } = useContext(DataContent);

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

	let [isOpen, setIsOpen] = useState(false);
	function closeModal() {
		setIsOpen(false);
	}
	function openModal() {
		setIsOpen(true);
	}

	const imgbbApiKey = "5617d55658537c83fee4ef9a7cffb921";

	// >> upload image to imgbb
	const uploadToImgbb = async (imageFile) => {
		showToast("loading", "Hosting image!");
		let formData = new FormData();
		formData.append("image", imageFile);
		formData.append("key", imgbbApiKey);
		try {
			const response = await axios.post("https://api.imgbb.com/1/upload", formData);
			return response.data.data.url;
		} catch (error) {
			showToast("error", "Image hosting failed!");
		}
	};

	const handleApartment = async (event) => {
		event.preventDefault();

		const form = event.target;
		const houseName = form.houseName.value;
		const address = form.address.value;
		const city = form.city.value;
		const bedrooms = form.bedrooms.value;
		const bathrooms = form.bathrooms.value;
		const roomSize = form.roomSize.value;
		const picture = form.picture.files[0];
		const availability = form.availability.value;
		const rent = form.rent.value;
		const phone = form.phone.value;
		const description = form.description.value;

		const options = {
			maxSizeMB: 0.1,
			maxWidthOrHeight: 1280,
			useWebWorker: true,
		};

		const compressedImage = await imageCompression(picture, options);
		const imageUrl = await uploadToImgbb(compressedImage);

		const roomData = {
			houseName,
			address,
			city,
			imageUrl,
			bedrooms,
			bathrooms,
			roomSize,
			picture,
			availability,
			rent,
			phone,
			description,
			uploaderImage: user.image,
			uploaderName: user.name,
		};

		try {
			const res = await axios.post("http://localhost:15000/houses", roomData);
			if (res.data.success) {
				showToast("success", "Successfully added apartment!");

				setTimeout(() => {
					showToast("loading", "Closing Modal!");
					setTimeout(() => {
						setIsOpen(false);
					}, 500);
				}, 1000);
			}
		} catch (error) {
			showToast("error", "Couldn't add! Please try again.");
			console.log(error);
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

			<div className="fixed w-full bottom-2">
				<div className="flex items-center justify-between pt-2 mx-3 border-t md:px-8 md:mx-auto xl:max-w-6xl lg:max-w-5xl md:max-w-4xl border-amber-900/30">
					<div className="flex flex-row gap-x-2">
						<div>
							<img
								src={user?.image}
								alt=""
								className="object-cover w-16 h-16 rounded-none"
							/>
						</div>
						<div>
							<p className="text-base font-medium text-gray-700">{user?.name}</p>
							<p className="text-sm text-gray-500">{user?.userName}</p>
							<p className="text-sm text-gray-500">{user?.email}</p>
						</div>
					</div>

					<div>
						<button
							type="button"
							onClick={openModal}
							className="flex items-center justify-start gap-x-2 submitButton"
						>
							<PlusSquare />
							Add New House
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
										Add new Apartment
									</Dialog.Title>

									{/* modal body below */}
									<div className="mt-2">
										<form
											className="grid grid-cols-2 gap-x-4 gap-y-1.5 "
											onSubmit={handleApartment}
										>
											{/* houseName */}
											<div>
												<label
													htmlFor="houseName"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													House name
												</label>
												<div className="mt-1">
													<input
														id="houseName"
														type="text"
														name="houseName"
														className="block w-full rounded-none border-0 py-1.5 text-gray-700 shadow-md ring-1 ring-inset ring-[#645104] placeholder:text-gray-400 sm:text-base sm:leading-6 focus:outline-none px-2 font-semibold"
														required
													/>
												</div>
											</div>
											{/* address */}
											<div>
												<label
													htmlFor="address"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													House Address
												</label>
												<div className="mt-1">
													<input
														id="address"
														required
														type="text"
														name="address"
														className="block w-full rounded-none border-0 py-1.5 text-gray-700 shadow-md ring-1 ring-inset ring-[#645104] placeholder:text-gray-400 sm:text-base sm:leading-6 focus:outline-none px-2 font-semibold"
													/>
												</div>
											</div>

											{/* city */}
											<div>
												<label
													htmlFor="city"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													City
												</label>
												<div className="mt-1">
													<input
														id="city"
														type="text"
														name="city"
														className="block w-full rounded-none border-0 py-1.5 text-gray-700 shadow-md ring-1 ring-inset ring-[#645104] placeholder:text-gray-400 sm:text-base sm:leading-6 focus:outline-none px-2 font-semibold"
														required
													/>
												</div>
											</div>

											{/* bedrooms */}
											<div>
												<label
													htmlFor="bedrooms"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													Bedrooms
												</label>
												<div className="mt-1">
													<input
														id="bedrooms"
														type="number"
														name="bedrooms"
														required
														className="block w-full rounded-none border-0 py-1.5 text-gray-700 shadow-md ring-1 ring-inset ring-[#645104] placeholder:text-gray-400 sm:text-base sm:leading-6 focus:outline-none px-2 font-semibold"
													/>
												</div>
											</div>

											{/* bathrooms */}
											<div>
												<label
													htmlFor="bathrooms"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													Bathrooms
												</label>
												<div className="mt-1">
													<input
														id="bathrooms"
														type="number"
														name="bathrooms"
														required
														className="block w-full rounded-none border-0 py-1.5 text-gray-700 shadow-md ring-1 ring-inset ring-[#645104] placeholder:text-gray-400 sm:text-base sm:leading-6 focus:outline-none px-2 font-semibold"
													/>
												</div>
											</div>

											{/* roomSize */}
											<div>
												<label
													htmlFor="roomSize"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													Room size (square feet)
												</label>
												<div className="mt-1">
													<input
														id="roomSize"
														type="text"
														name="roomSize"
														className="block w-full rounded-none border-0 py-1.5 text-gray-700 shadow-md ring-1 ring-inset ring-[#645104] placeholder:text-gray-400 sm:text-base sm:leading-6 focus:outline-none px-2 font-semibold"
														required
													/>
												</div>
											</div>

											{/* picture */}
											<div>
												<label
													htmlFor="picture"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													Pictures
												</label>
												<div className="mt-1">
													<input
														id="picture"
														type="file"
														name="picture"
														required
														className="block w-full rounded-none border-0 py-1.5 text-gray-700 shadow-md ring-1 ring-inset ring-[#645104] placeholder:text-gray-400 sm:text-base sm:leading-6 focus:outline-none px-2 font-semibold"
													/>
												</div>
											</div>

											{/* availability */}
											<div>
												<label
													htmlFor="availability"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													Availability
												</label>
												<div className="mt-1">
													<input
														id="availability"
														type="date"
														name="availability"
														className="block w-full rounded-none border-0 py-1.5 text-gray-700 shadow-md ring-1 ring-inset ring-[#645104] placeholder:text-gray-400 sm:text-base sm:leading-6 focus:outline-none px-2 font-semibold"
														required
													/>
												</div>
											</div>

											{/* rent */}
											<div>
												<label
													htmlFor="rent"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													Rent ( BDT )
												</label>
												<div className="mt-1">
													<input
														id="rent"
														type="text"
														name="rent"
														className="block w-full rounded-none border-0 py-1.5 text-gray-700 shadow-md ring-1 ring-inset ring-[#645104] placeholder:text-gray-400 sm:text-base sm:leading-6 focus:outline-none px-2 font-semibold"
														required
													/>
												</div>
											</div>

											{/* phone */}
											<div>
												<label
													htmlFor="phone"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													Phone
												</label>
												<div className="mt-1">
													<input
														id="phone"
														type="tel"
														pattern="^\+880[1-9][0-9]{9}$"
														title="Please enter a valid Bangladeshi phone number starting with +880"
														name="phone"
														value={userInput}
														onChange={handleInputChange}
														className="block w-full rounded-none border-0 py-1.5 text-gray-700 shadow-md ring-1 ring-inset ring-[#645104] placeholder:text-gray-400 sm:text-base sm:leading-6 focus:outline-none px-2 font-semibold"
														required
													/>
												</div>
											</div>

											{/* description */}
											<div className="col-span-full">
												<label
													htmlFor="description"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													Description ( you can use markdown language )
												</label>
												<div className="mt-1">
													<textarea
														id="description"
														type="number"
														name="description"
														required
														className="block w-full rounded-none border-0 py-1.5 text-gray-700 shadow-md ring-1 ring-inset ring-[#645104] placeholder:text-gray-400 sm:text-base sm:leading-6 focus:outline-none px-2 font-semibold"
														rows={4}
													></textarea>
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
													value="Submit"
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

export default TopNav;
