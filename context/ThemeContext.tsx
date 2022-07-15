import React, { useEffect, useRef, useState } from "react";

export const THEMES = {
	LIGHT: "light",
	DARK: "dark",
};

export const ThemeContext = React.createContext({
	currentTheme: THEMES.LIGHT,
	setCurrentTheme: (theme: string) => {},
});

export const ThemeContextProvider = ({ children }: any) => {
	const [currentTheme, setCurrentTheme] = useState<string>(THEMES.LIGHT);

	useEffect(() => {
		const localUserTheme = localStorage.getItem("user-local-theme") || "";
    console.log(localUserTheme);
    
		setCurrentTheme(localUserTheme.length > 0 ? localUserTheme : THEMES.LIGHT);
	}, []);

	const setThemeHandler = (theme: string) => {
		setCurrentTheme((prevTheme) => {
			const newTheme = prevTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
			localStorage.setItem("user-local-theme", newTheme);
			return newTheme;
		});
	};

	return (
		<ThemeContext.Provider
			value={{
				currentTheme: currentTheme,
				setCurrentTheme: setThemeHandler,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};
