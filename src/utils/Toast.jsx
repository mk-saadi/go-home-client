import { BadgeAlert, BadgeCheck, Loader } from "lucide-react";
import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";

// eslint-disable-next-line react/prop-types
const Toast = ({ type, message, onHide }) => {
	const toastClasses = {
		success: "border-2 border-[#2d5e2e] text-[#98bc62]",
		error: "border-2 border-red-400 text-red-400",
		loading: "border-2 border-[#a16c46] text-[#fab07a]",
	};

	let iconComponent;

	switch (type) {
		case "success":
			iconComponent = <BadgeCheck />;
			break;
		case "error":
			iconComponent = <BadgeAlert />;
			break;
		case "loading":
			iconComponent = <Loader className="animate-spin" />;
			break;
		default:
			iconComponent = null;
	}

	useEffect(() => {
		if (type === "success" || type === "error") {
			const timeoutId = setTimeout(onHide, 3000);
			return () => clearTimeout(timeoutId);
		}
	}, [type, onHide]);

	return (
		<Fade
			className="fixed z-50 flex justify-start w-full transform md:justify-center left:4 md:left:auto bottom-6 md:bottom-auto md:right-0 md:-translate-x-1/2 md:top-5"
			style={{ zIndex: "999999" }}
			direction="down"
		>
			<div
				className={` bg-white  font-semibold rounded-none shadow-md drop-shadow-md ${toastClasses[type]}`}
			>
				<p className="flex flex-row items-center justify-center px-2 py-1 text-sm font-semibold md:px-3 md:py-3 gap-x-4 md:text-lg">
					{iconComponent}
					{message}
				</p>
			</div>
		</Fade>
	);
};

export default Toast;
