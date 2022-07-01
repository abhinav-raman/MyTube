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
		<header className="fixed flex justify-center w-full h-16 bg-amber-400 border-b-2 border-b-amber-600">
			<h1 className="text-4xl font-bold cursor-pointer my-[9px]">
				<Link href="/">
					<a>Mytube</a>
				</Link>
			</h1>
			<div className="h-max absolute right-2 my-4">
				{!isLoggedIn ? (
					<button
						className="h-8 px-2 rounded-md border-2 border-amber-600 hover:border-amber-200"
						onClick={() => router.push("/login")}
					>
						Login
					</button>
				) : (
					<button
						className="h-8 px-2 rounded-md border-2 border-amber-600 hover:border-amber-200"
						onClick={logoutHandler}
					>
						Logout
					</button>
				)}
			</div>
		</header>
	);
};

export default Header;
