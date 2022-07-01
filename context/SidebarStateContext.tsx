import React, { useEffect, useRef, useState } from "react";

export const SideBarContext = React.createContext({
	isExpanded: true,
	invertIsExpanded: () => {},
});

export const SidebarContextProvider = ({ children }: any) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  
	useEffect(() => {
    const localSidebarState = localStorage.getItem("sideBarState") || "";
		console.log(localSidebarState);
    setIsExpanded(localSidebarState === "1" ? true : false);
	}, []);

	const sideBarStateHandler = () => {
		setIsExpanded((prevState) => {
			localStorage.setItem("sideBarState", prevState ? "0" : "1");
			return !prevState;
		});
	};

	return (
		<SideBarContext.Provider
			value={{
				isExpanded: isExpanded,
				invertIsExpanded: sideBarStateHandler,
			}}
		>
			{children}
		</SideBarContext.Provider>
	);
};
