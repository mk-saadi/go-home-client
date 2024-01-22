import { Fade } from "react-awesome-reveal";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../../utils/Toast";
import useToast from "../../utils/useToast";
import axios from "axios";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Register = () => {
	const { toastType, toastMessage, showToast, hideToast } = useToast();
	const navigate = useNavigate();
	const imgbbApiKey = "5617d55658537c83fee4ef9a7cffb921";
	const [passwordShow, setPasswordShow] = useState(false);

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
						imageUrl,
						email,
						password,
					};

					axios
						.post("http://localhost:15000/users", formData)
						.then((response) => {
							const responseData = JSON.parse(response.config.data);
							const userEmail = responseData.email;
							localStorage.setItem("email", userEmail);
							showToast("success", "Registration Successful!");

							console.log("Registration successful:", userEmail);
							// location.reload();
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

	axios
		.get("http://localhost:15000/users")
		.then((response) => {
			const userEmail = localStorage.getItem("email");

			const matchingUser = response.data.find((user) => user.email === userEmail);

			if (matchingUser) {
				localStorage.setItem("go-home-ISTJ", matchingUser._id);

				navigate("/");
				// localStorage.removeItem("email");

				console.log("Data of matching user stored in localStorage:", matchingUser);
			} else {
				console.log("No matching user found.");
			}
		})
		.catch((error) => {
			console.error("Error fetching user data:", error);
		});

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
						GoHome
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
							to="/login"
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
