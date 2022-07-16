import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { LoggedInContext } from "../context/LoggedInContext";
import { logOut } from "../firebase/firebase-auth";

import { PrimaryButton, ThemeButton } from "./ui/Button";

const Header = () => {
	const router = useRouter();
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

	return (
		<header className="fixed flex justify-center w-full h-16 bg-sky-200 dark:bg-sky-900 z-10">
			<h1 className="text-4xl font-bold cursor-pointer my-[9px] text-black dark:text-white">
				<Link href="/">
					<a>Mytube</a>
				</Link>
			</h1>
			<div className="h-max absolute right-4 my-4 flex">
				<ThemeButton />
				<PrimaryButton
					onClickHandler={() =>
						isLoggedIn ? logoutHandler() : router.push("/login")
					}
				>
					{isLoggedIn ? "Logout" : "Login"}
				</PrimaryButton>
			</div>
		</header>
	);
};

export default Header;
