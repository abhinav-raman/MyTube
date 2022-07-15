import React, { useEffect, useRef, useState } from "react";


export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
}

export const ThemeContext = React.createContext({
	currentTheme: THEMES.LIGHT,
	setCurrentTheme: (theme: string) => {},
});

export const ThemeContextProvider = ({ children }: any) => {
	const [currentTheme, setCurrentTheme] = useState<string>(THEMES.LIGHT);

	// useEffect(() => {
	// 	const localUserId = localStorage.getItem("userId") || "";
	// 	setUserId(localUserId);
	// 	setIsLoggedIn(localUserId.length > 0 ? true : false);
	// }, []);

  const setThemeHandler = (theme: string) => {
    console.log(theme);
    
    setCurrentTheme(theme);
  }

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
