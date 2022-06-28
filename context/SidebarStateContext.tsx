import React, { useState } from "react";

export const SideBarContext = React.createContext({
	isExpanded: true,
	invertIsExpanded: () => {},
});

export const SidebarContextProvider = ({ children }: any) => {
	const [isExpanded, setIsExpanded] = useState<boolean>(true);

	const sideBarStateHandler = () => {
		setIsExpanded(prevState => !prevState);
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
