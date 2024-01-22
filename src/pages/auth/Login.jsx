import { Fade } from "react-awesome-reveal";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import useToast from "../../utils/useToast";
import Toast from "../../utils/Toast";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Login = () => {
	const navigate = useNavigate();
	const [passwordShow, setPasswordShow] = useState(false);
	const { toastType, toastMessage, showToast, hideToast } = useToast();

	const handlePasswordShow = () => {
		setPasswordShow(!passwordShow);
	};

	const handleLogin = (event) => {
		event.preventDefault();

		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;

		const formData = {
			email,
			password,
		};

		showToast("loading", "Loading... please wait!");
		axios
			.post("http://localhost:15000/users/login", formData)
			.then((response) => {
				const responseData = JSON.parse(response.config.data);
				const userEmail = responseData.email;

				localStorage.setItem("email", userEmail);
				window.location.reload(true);

				showToast("success", "Login Successful!");
			})
			.catch((error) => {
				console.error("Login failed:", error);
				showToast("error", "Login Failed! Please try again.");
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
						Sign in to your account
					</Fade>
				</div>

				<Fade
					damping={1}
					triggerOnce
					className=" sm:mx-auto sm:w-full sm:max-w-sm"
				>
					<form
						className="space-y-6"
						method="POST"
						onSubmit={handleLogin}
					>
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
									autoComplete="email"
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
						Not a member?{" "}
						<Link
							to="/register"
							className="font-semibold leading-6 text-[#c59e00] hover:underline"
						>
							Sign up here.
						</Link>
					</p>
				</Fade>
			</div>
		</>
	);
};
export default Login;
