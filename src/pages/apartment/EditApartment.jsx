import useToast from "../../utils/useToast";
import Toast from "../../utils/Toast";
import axios from "axios";
import { useEffect, useState, Fragment, useContext } from "react";
import { useParams } from "react-router-dom";
import Typography from "../../utils/Typography";
import { BookMarked } from "lucide-react";
import { DataContent } from "../../../utils/Providers";
import { Dialog, Transition } from "@headlessui/react";
import { MoveLeft, PlusSquare } from "lucide-react";

const EditApartment = () => {
	const { user } = useContext(DataContent);
	const { toastType, toastMessage, showToast, hideToast } = useToast();
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
			uploaderImage: user?.image,
			uploaderName: user?.name,
		};

		try {
			const res = await axios.put("http://localhost:15000/houses", roomData);
			if (res.data) {
				showToast("success", "Successfully added apartment!");
				setIsOpen(false);
			}
		} catch (error) {
			showToast("error", "Couldn't add to the database. Please try again!");
		}
	};

	let [isOpen, setIsOpen] = useState(false);
	function closeModal() {
		setIsOpen(false);
	}
	function openModal() {
		setIsOpen(true);
	}

	return (
		<div>
			{toastType && (
				<Toast
					type={toastType}
					message={toastMessage}
					onHide={hideToast}
				/>
			)}
		</div>
	);
};

export default EditApartment;
