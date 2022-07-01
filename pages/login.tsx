import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { LoggedInContext } from "../context/LoggedInContext";
import { SideBarContext } from "../context/SidebarStateContext";
import { logIn } from "../firebase/firebase-auth";

const Login: NextPage = () => {
	const router = useRouter();
	let { message } = router.query;

	const { isExpanded } = useContext(SideBarContext);
	const { isLoggedIn, setIsLoggedIn } = useContext(LoggedInContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [showMessage, setShowMessage] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setShowMessage(false);
		}, 2000);
	}, []);

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
				<title>Youtube | Login</title>
				<meta name="description" content="Login for mytube" />
			</Head>
			<main
				className={`pt-[4.5rem] transition-all h-full flex justify-center items-center ${
					isExpanded ? "ml-64" : "ml-12"
				}`}
			>
				<section className="w-96 bg-amber-100 p-4 text-center rounded-lg">
					<form onSubmit={submitHandler}>
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
					</form>
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
			</main>
		</>
	);
};

export default Login;
