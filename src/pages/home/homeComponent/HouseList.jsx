import { Eraser, Loader, MoveLeft, Pencil } from "lucide-react";
import { useState, Fragment, useEffect, useContext } from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import useToast from "../../../utils/useToast";
import Toast from "../../../utils/Toast";
import { DataContent } from "../../../utils/Providers";

/* eslint-disable react/prop-types */
const HouseList = () => {
	const { toastType, toastMessage, showToast, hideToast } = useToast();
	const [houses, setHouses] = useState([]);
	const { user } = useContext(DataContent);
	const [loading, setLoading] = useState(true);

	const userName = user?.userName;

	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			try {
				const res = await axios.get("https://go-home-server-ocj6eub4l-mk-saadi.vercel.app/houses");
				if (res.status === 200) {
					setLoading(false);
					const data = res.data;
					const filterHouse = data.filter((po) => po.uploaderUserName === userName);

					setHouses(filterHouse);
				}
			} catch (error) {
				console.log(error.message);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [userName]);

	const [userIdToDelete, setUserIdToDelete] = useState(null);
	let [isOpen, setIsOpen] = useState(false);
	function closeModal() {
		setIsOpen(false);
	}
	function openModal(userId) {
		setUserIdToDelete(userId);
		setIsOpen(true);
	}

	const handleDelete = async (id) => {
		showToast("loading", "Please wait!");

		try {
			const res = await axios.delete(
				`https://go-home-server-ocj6eub4l-mk-saadi.vercel.app/houses/${id}`
			);
			if (res.data.deletedCount > 0) {
				setIsOpen(false);
				showToast("success", "successfully deleted apartment!");

				setHouses((past) => past.filter((ha) => ha._id !== id));
			}
		} catch (error) {
			setIsOpen(false);
			showToast("error", "Couldn't delete apartment, please try again!");
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

			<div className="py-2 mx-3 md:px-8 md:mx-auto xl:max-w-6xl lg:max-w-5xl md:max-w-4xl">
				<div>
					<p className="text-base font-medium text-gray-700">
						Number of apartment listed for rent: 0{houses.length}{" "}
					</p>
				</div>

				{loading ? (
					<div className="h-[80vh]">
						<div className="flex flex-col items-center justify-center overflow-y-hidden text-[#a16c46]">
							<Loader className="w-20 h-20 animate-spin" />
							<p className="text-xl font-semibold">Loading...</p>
						</div>
					</div>
				) : (
					<Fade
						cascade
						triggerOnce
						damping={0.1}
					>
						{houses.map((ha) => (
							<div
								key={ha._id}
								className="flex justify-start gap-x-2.5 my-1.5 px-2 py-2.5 border-y border-amber-900/15 bg-white  duration-200 hover:bg-amber-50 group"
							>
								<Link
									to={`/dashboard/${ha._id}`}
									className="overflow-hidden"
								>
									<img
										src={ha.imageUrls[0]}
										alt=""
										className="object-cover duration-700 h-28 w-36 group-hover:scale-110"
									/>
								</Link>

								<div className="flex flex-col flex-grow">
									<Link
										to={`/dashboard/${ha._id}`}
										className="text-base font-semibold text-gray-700 group-hover:underline"
									>
										{ha.houseName}
									</Link>
									<p className="text-sm font-medium text-gray-500">{ha.city}</p>
									<p className="text-sm font-medium text-gray-500">BDT: ৳{ha.rent}</p>
									<p className="text-sm font-medium text-gray-500">
										Available from: {ha.availability}
									</p>
								</div>

								<div className="flex flex-col items-center justify-center md:gap-y-0 gap-y-3 md:flex-row w-fit h-fit gap-x-2">
									<button
										className="flex items-center justify-start logOutButton gap-x-2"
										onClick={() => openModal(ha._id)}
									>
										{" "}
										<Eraser />
										Delete?
									</button>
									<Link
										className="flex items-center justify-start submitButton gap-x-2"
										to={`/edit/${ha._id}`}
									>
										{" "}
										<Pencil />
										Edit?
									</Link>
								</div>
							</div>
						))}
					</Fade>
				)}
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
										Delete this apartment?
									</Dialog.Title>

									{/* modal body below */}
									<div className="mt-2">
										<div>
											<p>Are you sure you want to delete this apartment?</p>
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

											<button
												className="logOutButton"
												onClick={() => handleDelete(userIdToDelete)}
											>
												Delete
											</button>
										</div>
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

export default HouseList;
