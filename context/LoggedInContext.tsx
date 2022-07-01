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
	const localUserId = useRef<string>("");

	useEffect(() => {
		localUserId.current = localStorage.getItem("userId") || "";
	});

	const [userId, setUserId] = useState<string>(localUserId.current);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
		localUserId ? true : false
	);

	const loginStateHandler = ({
		status,
		userId,
	}: {
		status: boolean;
		userId: string;
	}) => {
		setIsLoggedIn(status);
		setUserId(userId);
		localStorage.removeItem("userId");
    
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
