import React, { useState } from "react";

export const LoggedInContext = React.createContext({
	isLoggedIn: false,
	setIsLoggedIn: (state: boolean) => {},
});

export const LoggedInContextProvider = ({ children }: any) => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	const loginStateHandler = (state: boolean) => {
		setIsLoggedIn(!isLoggedIn);
	};

	return (
		<LoggedInContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				setIsLoggedIn: loginStateHandler,
			}}
		>
			{children}
		</LoggedInContext.Provider>
	);
};
