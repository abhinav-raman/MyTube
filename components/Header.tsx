import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { LoggedInContext } from "../context/LoggedInContext";
import { logOut } from "../firebase/firebase-auth";
import { ThemeContext, THEMES } from "../context/ThemeContext";

import DarkThemeIcon from "../assets/images/dark-theme-icon.svg";
import LightThemeIcon from "../assets/images/light-theme-icon.svg";

const Header = () => {
	const router = useRouter();
	const themeContext = useContext(ThemeContext);
	const { isLoggedIn, setIsLoggedIn } = useContext(LoggedInContext);

	const logoutHandler = async () => {
		try {
			const response = await logOut();
			setIsLoggedIn({ status: false, userId: "" });
			console.log(response);
		} catch (error) {
			console.log("Error in logging out user.", error);
		}
	};

	const toggleThemeHandler = () => {
		themeContext.setCurrentTheme(
			themeContext.currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK
		);
	};

	return (
		<header className="fixed flex justify-center w-full h-16 bg-sky-200 dark:bg-sky-900 z-10">
			<h1 className="text-4xl font-bold cursor-pointer my-[9px] text-sky-900 dark:text-white">
				<Link href="/">
					<a>Mytube</a>
				</Link>
			</h1>
			<div className="h-max absolute right-4 my-4 flex">
				<button onClick={toggleThemeHandler} className="h-8 w-8 p-1 mr-2">
					{themeContext.currentTheme === THEMES.DARK ? (
						<LightThemeIcon className="text-white" />
					) : (
						<DarkThemeIcon className="text-sky-800" />
					)}
				</button>
				<button
					className="h-8 px-2 rounded-md bg-sky-600 hover:bg-sky-600/75 text-white shadow-lg"
					onClick={() => (isLoggedIn ? logoutHandler() : router.push("/login"))}
				>
					{isLoggedIn ? "Logout" : "Login"}
				</button>
			</div>
		</header>
	);
};

export default Header;
