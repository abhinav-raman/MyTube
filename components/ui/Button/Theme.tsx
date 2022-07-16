import { useContext } from "react";
import { ThemeContext, THEMES } from "../../../context/ThemeContext";
import LightThemeIcon from "../../../assets/images/light-theme-icon.svg";
import DarkThemeIcon from "../../../assets/images/dark-theme-icon.svg";

const ThemeButton = () => {
	const themeContext = useContext(ThemeContext);

	const toggleThemeHandler = () => {
		themeContext.setCurrentTheme(
			themeContext.currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK
		);
	};

	return (
		<button onClick={toggleThemeHandler} className="h-8 w-8 p-1 mr-2">
			{themeContext.currentTheme === THEMES.DARK ? (
				<LightThemeIcon className="text-white" />
			) : (
				<DarkThemeIcon className="text-sky-800" />
			)}
		</button>
	);
};

export default ThemeButton;
