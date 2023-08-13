import { useEffect, useState } from "react";

const useScrollPosition = (refElem: any) => {
	const [scrollPosition, setScrollPosition] = useState(0);

	useEffect(() => {
		const updatePosition = () => {
			const newPosition = refElem.scrollY;

			setScrollPosition(newPosition);
		};

		refElem.addEventListener("scroll", updatePosition);
		updatePosition();

		return () => {
			refElem.removeEventListener("scroll", updatePosition);
		};
	}, []);

	return scrollPosition;
};

export default useScrollPosition;
