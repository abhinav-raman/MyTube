import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { LoggedInContext } from "../context/LoggedInContext";
import { logOut } from "../firebase/firebase-auth";

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
		<header className="fixed flex justify-center w-full h-16 bg-indigo-200 z-10">
			<h1 className="text-4xl font-bold cursor-pointer my-[9px] text-indigo-800">
				<Link href="/">
					<a>Mytube</a>
				</Link>
			</h1>
			<div className="h-max absolute right-4 my-4">
				<button
					className="h-8 px-2 rounded-md bg-indigo-600 hover:bg-indigo-600/75 text-white shadow-lg shadow-indigo-400"
					onClick={() => (isLoggedIn ? logoutHandler() : router.push("/login"))}
				>
					{isLoggedIn ? "Logout" : "Login"}
				</button>
			</div>
		</header>
	);
};

export default Header;
