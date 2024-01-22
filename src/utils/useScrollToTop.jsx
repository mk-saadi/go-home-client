import { useEffect } from "react";

export default function useScrollToTop() {
	useEffect(() => {
		const rootElement = document.getElementById("root");
		if (rootElement) {
			rootElement.scrollIntoView({ behavior: "smooth" });
		}
	}, [window.location.pathname]);
}
