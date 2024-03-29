import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import useToast from "../../utils/useToast";
import Toast from "../../utils/Toast";

const EditApartment = () => {
	const { id } = useParams();
	const { toastType, toastMessage, showToast, hideToast } = useToast();
	const [house, setHouse] = useState([]);

	const images = house.imageUrls;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(
					`https://go-home-server-ocj6eub4l-mk-saadi.vercel.app/houses/${id}`
				);
				if (res) {
					setHouse(res.data);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [id]);

	const handleApartment = async (event) => {
		event.preventDefault();
		showToast("loading", "Please wait!");

		const form = event.target;
		const houseName = form.houseName.value;
		const address = form.address.value;
		const city = form.city.value;
		const bedrooms = parseFloat(form.bedrooms.value);
		const bathrooms = parseFloat(form.bathrooms.value);
		const roomSize = parseFloat(form.roomSize.value);

		const availability = form.availability.value;
		const rent = parseFloat(form.rent.value);
		const phone = form.phone.value;
		const description = form.description.value;

		const roomData = {
			houseName,
			address,
			city,
			bedrooms,
			bathrooms,
			roomSize,
			availability,
			rent,
			phone,
			description,
		};

		try {
			const res = await axios.put(
				`https://go-home-server-ocj6eub4l-mk-saadi.vercel.app/houses/${id}`,
				roomData
			);
			console.log("res: ", res);
			if (res.data.modifiedCount > 0) {
				showToast("success", "Successfully updated apartment!");

				setTimeout(() => {
					showToast("loading", "Redirecting");
					setTimeout(() => {
						navigate("/");
					}, 500);
				}, 1000);
			}
		} catch (error) {
			showToast("error", "Couldn't update. Please try again!");
		}
	};

	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<div>
			{toastType && (
				<Toast
					type={toastType}
					message={toastMessage}
					onHide={hideToast}
				/>
			)}

			<div className="mx-3 my-10 md:px-8 md:mx-auto xl:max-w-6xl lg:max-w-5xl md:max-w-4xl">
				<div className="mt-4 mb-6">
					<p className="text-lg font-medium leading-6 text-gray-900">Update your apartment?</p>
				</div>
				<form
					className="grid grid-cols-2 gap-x-4 gap-y-6 "
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
								defaultValue={house.houseName}
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
								defaultValue={house.address}
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
								defaultValue={house.city}
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
								defaultValue={house.bedrooms}
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
								defaultValue={house.bathrooms}
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
							Room size <span className="text-xs text-gray-500">( square feet )</span>
						</label>
						<div className="mt-1">
							<input
								id="roomSize"
								type="text"
								name="roomSize"
								defaultValue={house.roomSize}
								className="block w-full rounded-none border-0 py-1.5 text-gray-700 shadow-md ring-1 ring-inset ring-[#645104] placeholder:text-gray-400 sm:text-base sm:leading-6 focus:outline-none px-2 font-semibold"
								required
							/>
						</div>
					</div>

					{/* picture */}
					<div className="col-span-full">
						<label
							htmlFor="picture"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Pictures
						</label>

						<div className="flex w-full mt-1 space-x-3">
							{images &&
								images.map((image, index) => (
									<div key={index}>
										<img
											src={image}
											alt={`Preview ${index + 1}`}
											className="object-cover w-24 h-24 border rounded-none border-amber-900/70 -md"
										/>
									</div>
								))}
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
								defaultValue={house.availability}
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
							Rent <span className="text-xs text-gray-500">( BDT )</span>
						</label>
						<div className="mt-1">
							<input
								id="rent"
								type="text"
								name="rent"
								defaultValue={house.rent}
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
								name="phone"
								className="block w-full rounded-none border-0 py-1.5 text-gray-700 shadow-md ring-1 ring-inset ring-[#645104] placeholder:text-gray-400 sm:text-base sm:leading-6 focus:outline-none px-2 font-semibold"
								defaultValue={house.phone}
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
							Description{" "}
							<span className="text-xs text-gray-500">( you can use markdown language )</span>
						</label>
						<div className="mt-1">
							<textarea
								id="description"
								type="number"
								name="description"
								defaultValue={house.description}
								required
								className="block w-full rounded-none border-0 py-1.5 text-gray-700 shadow-md ring-1 ring-inset ring-[#645104] placeholder:text-gray-400 sm:text-base sm:leading-6 focus:outline-none px-2 font-semibold"
								rows={8}
							></textarea>
						</div>
					</div>

					<div className="flex justify-between w-full mt-4 col-span-full gap-x-12">
						<div className="w-full">
							<button
								type="button"
								className="flex justify-center goBack"
								onClick={handleGoBack}
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
		</div>
	);
};

export default EditApartment;
