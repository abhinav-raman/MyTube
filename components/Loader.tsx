import { useContext } from "react";
import LoaderIcon from "../assets/images/loader.svg";
import { ThemeContext } from "../context/ThemeContext";

import { THEMES } from "../context/ThemeContext";

const Loader = () => {
	const themeContext = useContext(ThemeContext);

	return (
		<div className="h-16 w-full">
			<div className="h-full aspect-square mx-auto">
				<LoaderIcon
					alt="loading"
					className={`animate-spin-2 ${
						themeContext.currentTheme === THEMES.DARK ? "fill-white" : ""
					}`}
				/>
			</div>
		</div>
	);
};

export default Loader;
