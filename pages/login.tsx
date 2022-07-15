import type { NextPage } from "next";
import Head from "next/head";
// import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { LoggedInContext } from "../context/LoggedInContext";
import { SideBarContext } from "../context/SidebarStateContext";
import {
	getGoogleRedirectResult,
	googleSignIn,
	logIn,
} from "../firebase/firebase-auth";
import BackIcon from "../assets/images/back-arrow.svg";
import GoogleIcon from "../assets/images/google-logo.svg";
import LoaderIcon from "../assets/images/loader.svg";
import Loader from "../components/Loader";

const Login: NextPage = () => {
	const router = useRouter();
	let { message } = router.query;

	const { isExpanded } = useContext(SideBarContext);
	const { isLoggedIn, setIsLoggedIn } = useContext(LoggedInContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const [showMessage, setShowMessage] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setShowMessage(false);
		}, 2000);
	}, []);

	const googleSignInHandler = async () => {
		const response = await googleSignIn();
		console.log(response);
	};

	useEffect(() => {
		if (isLoggedIn) {
			router.replace("/");
		}

		setIsLoading(true);
		getGoogleRedirectResult()
			.then((result) => {
				if (result) {
					const { user } = result;
					setIsLoggedIn({ userId: user.uid, status: true });
					router.replace("/");
				}
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
				throw new Error(error.message);
			});
	}, [isLoggedIn, router, setIsLoggedIn]);

	const logInHandler = async () => {
		try {
			const response = await logIn(email, password);
			console.log(response);

			setIsLoggedIn({ userId: response.user.uid, status: true });
			router.replace("/");
		} catch (error) {
			console.log(error);
		}
	};

	const submitHandler = (event: any) => {
		event.preventDefault();
		logInHandler();
	};

	return (
		<>
			<Head>
				<title>MyTube | Login</title>
				<meta name="description" content="Login for mytube" />
			</Head>
			<main
				className={`h-screen flex flex-col pt-[4.5rem] p-2 transition-all ${
					isExpanded ? "ml-64" : "ml-12"
				}`}
			>
				<div className="h-8">
					<button
						className="h-full aspect-square"
						onClick={() => router.back()}
					>
						<BackIcon
							alt="back"
							layout="responsive"
							className="hover:-translate-x-1 transition-all"
						/>
					</button>
				</div>
				<div className="h-full pb-16 flex flex-col justify-center items-center">
					<section className="w-96 bg-amber-100 p-4 text-center rounded-lg">
						{/* <form onSubmit={submitHandler}>
							<h2 className="w-full text-center mb-2 text-2xl font-bold text-indigo-600">
								Login
							</h2>
							{showMessage && message?.length && (
								<p className="my-2 font-medium text-green-500">{message}</p>
							)}
							{}
							<input
								name="email"
								className="mb-2 h-8 w-full rounded-md outline-none border-2 focus:border-amber-400 p-2"
								placeholder="Email"
								type="email"
								value={email}
								onChange={({ target }) => setEmail(target.value)}
							/>
							<input
								name="password"
								className="mb-2 h-8 w-full rounded-md outline-none border-2 focus:border-amber-400 p-2"
								placeholder="Password"
								type="password"
								value={password}
								onChange={({ target }) => setPassword(target.value)}
							/>
							<button
								className="rounded-md bg-amber-400 px-4 py-2"
								type="submit"
								onClick={submitHandler}
							>
								Submit
							</button>
						</form> */}
						<button
							className="flex rounded-md border bg-white border-slate-400 p-1 h-10 m-auto my-4"
							onClick={googleSignInHandler}
						>
							<div className="h-6 aspect-square m-auto mx-2">
								<GoogleIcon
									alt="google-icon"
									layout="fixed"
									height="24"
									width="24"
								/>
							</div>
							{isLoading ? (
								<Loader />
							) : (
								<p className="m-auto mx-2">Login with Google</p>
							)}
						</button>
						<p>
							Not a user?{" "}
							<span
								className="w-full cursor-pointer text-blue-500"
								onClick={() => router.replace("/signup")}
							>
								Sign up
							</span>
						</p>
					</section>
				</div>
			</main>
		</>
	);
};

export default Login;
