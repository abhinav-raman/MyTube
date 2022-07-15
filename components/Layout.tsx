import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { THEMES } from "../context/ThemeContext";

const Layout = ({ children }: any) => {
	const themeContext = useContext(ThemeContext);

	return (
		<div
			className={`min-h-screen antialiased ${
				themeContext.currentTheme === THEMES.DARK ? "dark" : "light"
			}`}
		>
			<Header />
			<Sidebar />
			{children}
		</div>
	);
};

export default Layout;
