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
		<header className="fixed flex justify-center w-full h-12 bg-amber-400 border-b-2 border-b-amber-600">
			<h1 className="text-3xl font-bold cursor-pointer">
				<Link href="/">
					<a>Mytube</a>
				</Link>
			</h1>
			<div className="h-full absolute right-2">
				{!isLoggedIn ? (
					<button
						className="h-8 my-2 px-2 rounded-md border-2 border-amber-600 hover:border-amber-200"
						onClick={() => router.push("/login")}
					>
						Login
					</button>
				) : (
					<button
						className="h-8 my-2 px-2 rounded-md border-2 border-amber-600 hover:border-amber-200"
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
