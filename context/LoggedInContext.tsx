import React, { useEffect, useRef, useState } from "react";

export const LoggedInContext = React.createContext({
	isLoggedIn: false,
	setIsLoggedIn: ({
		status,
		userId,
	}: {
		status: boolean;
		userId: string;
	}) => {},
});

export const LoggedInContextProvider = ({ children }: any) => {
	const [userId, setUserId] = useState<string>("");
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	useEffect(() => {
		const localUserId = localStorage.getItem("userId") || "";
		setUserId(localUserId);
		setIsLoggedIn(localUserId.length > 0 ? true : false);
	}, []);
  
	const loginStateHandler = ({
		status,
		userId,
	}: {
		status: boolean;
		userId: string;
	}) => {
		setIsLoggedIn(status);
		setUserId(userId);
		localStorage.setItem("userId", userId);
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
