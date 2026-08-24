import { useSyncExternalStore } from "react";

function subscribe(query: string) {
	return (callback: () => void) => {
		const matchMedia = window.matchMedia(query);
		matchMedia.addEventListener("change", callback);
		return () => matchMedia.removeEventListener("change", callback);
	};
}

export const useMediaQuery = (query: string) => {
	return useSyncExternalStore(
		subscribe(query),
		() => window.matchMedia(query).matches,
		() => false
	);
};
