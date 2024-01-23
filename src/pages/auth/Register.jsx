import { Fade } from "react-awesome-reveal";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../../utils/Toast";
import useToast from "../../utils/useToast";
import axios from "axios";
import { useEffect, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { RadioGroup } from "@headlessui/react";

const role = [
	{ name: "Renter", obj: "want to rent apartment" },
	{ name: "RentOut", obj: "want to put apartment for rent" },
];

const Register = () => {
	const { toastType, toastMessage, showToast, hideToast } = useToast();
	const navigate = useNavigate();
	const imgbbApiKey = "5617d55658537c83fee4ef9a7cffb921";
	const [passwordShow, setPasswordShow] = useState(false);
	const [selected, setSelected] = useState(role[0]);

	const handlePasswordShow = () => {
		setPasswordShow(!passwordShow);
	};

	const generateRandomUsername = (name) => {
		// Convert the name to lowercase.
		name = name.toLowerCase();

		const nameTokens = name.split(" ");

		if (nameTokens.length === 1) {
			const randomNumber = Math.floor(Math.random() * 1000);
			return nameTokens[0] + randomNumber;
		}

		const combinedName = nameTokens.join("_");
		const randomNumber = Math.floor(Math.random() * 1000);

		return combinedName + randomNumber;
	};

	const handleSignUp = (event) => {
		event.preventDefault();

		const form = event.target;
		const name = form.name.value;
		const image = form.image.files[0];
		const email = form.email.value;
		const password = form.password.value;
		const role = selected.name;

		const userName = generateRandomUsername(name);
		if (userName === null) {
			showToast("error", "username generation failed!");
			return;
		}

		const imgbbFormData = new FormData();
		imgbbFormData.append("image", image);

		showToast("loading", "Please wait!");

		axios
			.post(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, imgbbFormData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((imgbbResponse) => {
				if (imgbbResponse.data.status === 200) {
					const imageUrl = imgbbResponse.data.data.url;

					const formData = {
						name,
						userName,
						image: imageUrl,
						email,
						password,
						role,
					};

					console.log("formData: ", formData);
					axios
						.post("http://localhost:15000/users", formData)
						.then((response) => {
							const responseData = JSON.parse(response.config.data);
							const userEmail = responseData.email;
							localStorage.setItem("email", userEmail);
							showToast("success", "Registration Successful!");

							window.location.reload(true);
						})
						.catch((registrationError) => {
							console.error("Registration failed:", registrationError);
							showToast("error", "Registration failed!");
						});
				} else {
					alert("Please try again");
					console.error("Image upload to ImgBB failed:", imgbbResponse.data);
				}
			})
			.catch((imgbbError) => {
				console.error("Image upload to ImgBB failed:", imgbbError);
				showToast("error", "Image upload error!");
			});
	};

	useEffect(() => {
		axios
			.get("http://localhost:15000/users")
			.then((response) => {
				const userEmail = localStorage.getItem("email");

				const matchingUser = response.data.find((user) => user.email === userEmail);

				if (matchingUser) {
					localStorage.setItem("go-home-ISTJ", matchingUser._id);

					if (matchingUser.role === "Renter") {
						navigate("/dashboard/bookedApartments");
					}
					if (matchingUser.role === "RentOut") {
						navigate("/dashboard/houseList");
					}

					console.log("Data of matching user stored in localStorage:", matchingUser);
				} else {
					console.log("No matching user found.");
				}
			})
			.catch((error) => {
				console.error("Error fetching user data:", error);
			});
	}, [navigate]);

	return (
		<>
			{toastType && (
				<Toast
					type={toastType}
					message={toastMessage}
					onHide={hideToast}
				/>
			)}

			<div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
				<div className="h-full sm:mx-auto sm:w-full sm:max-w-sm">
					<Fade
						triggerOnce
						className="text-[#f7cf31] text-3xl text-center font-semibold"
					>
						HouseHunter
					</Fade>
					<Fade
						triggerOnce
						className="mt-4 text-xl font-bold leading-9 tracking-tight text-center text-gray-900"
					>
						Create new account
					</Fade>
				</div>

				<Fade
					damping={1}
					triggerOnce
					className=" sm:mx-auto sm:w-full sm:max-w-sm"
				>
					<form
						className="space-y-4"
						method="POST"
						onSubmit={handleSignUp}
					>
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Your name
							</label>
							<div className="mt-2">
								<input
									id="name"
									name="name"
									type="text"
									required
									className="block w-full rounded-none border-0 py-1.5 text-gray-700 shadow-md ring-1 ring-inset ring-[#645104] placeholder:text-gray-400 sm:text-base sm:leading-6 focus:outline-none px-2 font-semibold"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="image"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Your image
							</label>
							<div className="mt-2">
								<input
									id="image"
									name="image"
									type="file"
									required
									className="block w-full rounded-none border-0 py-1.5 text-gray-700 shadow-md ring-1 ring-inset ring-[#645104] placeholder:text-gray-400 sm:text-base sm:leading-6 focus:outline-none px-2 font-semibold"
								/>
							</div>
						</div>

						{/* role*/}
						<div className="w-full">
							<label
								htmlFor="CityCat"
								className="block text-sm font-semibold leading-6 text-gray-900"
							>
								Select your objective.
							</label>
							<div className="w-full max-w-md mx-auto mt-2">
								<RadioGroup
									value={selected}
									onChange={setSelected}
								>
									<RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
									<div className="flex justify-start w-full space-x-2">
										{role.map((plan) => (
											<RadioGroup.Option
												key={plan.name}
												value={plan}
												className={({ active, checked }) =>
													`${
														active
															? "//you can use /ring/ for the selected//"
															: ""
													}
                                                            ${
																checked
																	? "bg-gradient-to-b from-[#f7cf31] to-[#c59e00] text-white"
																	: "bg-white"
															}
                                                                relative flex cursor-pointer rounded-none px-5 py-1 shadow-md focus:outline-none  ring-1 ring-[#645104]`
												}
											>
												{({ checked }) => (
													<>
														<div className="flex items-center justify-between w-full">
															<div className="flex items-center">
																<div className="text-sm">
																	<RadioGroup.Label
																		as="p"
																		className={`font-medium  ${
																			checked
																				? "text-[#645104] font-semibold"
																				: "text-gray-700 font-semibold"
																		}`}
																		title={plan.obj}
																	>
																		{plan.name}
																	</RadioGroup.Label>
																</div>
															</div>
														</div>
													</>
												)}
											</RadioGroup.Option>
										))}
									</div>
								</RadioGroup>
							</div>
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									required
									className="block w-full rounded-none border-0 py-1.5 text-gray-700 shadow-md ring-1 ring-inset ring-[#645104] placeholder:text-gray-400 sm:text-base sm:leading-6 focus:outline-none px-2 font-semibold"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Password
							</label>
							<div className="relative mt-2">
								<input
									id="password"
									name="password"
									type={passwordShow ? `text` : `password`}
									autoComplete="password"
									required
									className="block w-full rounded-none border-0 py-1.5 text-gray-700 shadow-md ring-1 ring-inset ring-[#645104] placeholder:text-gray-400 sm:text-base sm:leading-6 focus:outline-none px-2 font-semibold"
								/>
								{passwordShow ? (
									<EyeIcon
										onClick={() => handlePasswordShow()}
										className="absolute cursor-pointer right-5 top-2"
									/>
								) : (
									<EyeOffIcon
										onClick={() => handlePasswordShow()}
										className="absolute cursor-pointer right-5 top-2"
									/>
								)}
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="submitButton"
							>
								Sign in
							</button>
						</div>
					</form>

					<p className="mt-10 text-base text-center text-gray-500">
						Already a member?{" "}
						<Link
							to="/"
							className="font-semibold leading-6 text-[#c59e00] hover:underline"
						>
							Sign in here.
						</Link>
					</p>
				</Fade>
			</div>
		</>
	);
};

export default Register;
