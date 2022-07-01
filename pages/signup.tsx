import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { SideBarContext } from "../context/SidebarStateContext";
import { signUp } from "../firebase/firebase-auth";
import backIcon from "../assets/images/back-arrow.svg";

const Signup = () => {
	const { isExpanded } = useContext(SideBarContext);

	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [retypedPassword, setRetypedPassword] = useState("");
	const [errorInForm, setErrorInForm] = useState({
		status: false,
		message: "",
	});

	const signInHandler = async () => {
		try {
			const response = await signUp(email, password);
			console.log(response);
			router.replace(
				{
					pathname: "/login",
					query: {
						message:
							"User created successfully. Please login with credentials.",
					},
				},
				{
					pathname: "/login",
				}
			);
		} catch (error) {
			console.log(error);
		}
	};

	const submitHandler = (event: any) => {
		event.preventDefault();

		if (password !== retypedPassword) {
			setErrorInForm({
				status: true,
				message: "Entered passwords do not match.",
			});
			return;
		}

		signInHandler();
	};

	return (
		<>
			<Head>
				<title>Youtube | Signup</title>
				<meta name="description" content="Login for mytube" />
			</Head>
			<main
				className={`h-full flex flex-col pt-[4.5rem] p-2 transition-all ${
					isExpanded ? "ml-64" : "ml-12"
				}`}
			>
				<div className="h-8">
					<button
						className="h-full aspect-square"
						onClick={() => router.back()}
					>
						<Image src={backIcon} alt="back" layout="responsive" className="hover:-translate-x-1 transition-all" />
					</button>
				</div>
				<div className="h-full pb-16 flex flex-col justify-center items-center">
					<section className="w-96 bg-amber-100 p-4 text-center rounded-lg">
						<form onSubmit={submitHandler}>
							<h2 className="w-full text-center mb-2 text-2xl font-bold text-indigo-600">
								Sign Up
							</h2>
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
								onChange={({ target }) => {
									setPassword(target.value);
									setErrorInForm({ status: false, message: "" });
								}}
							/>
							<input
								name="password"
								className="mb-2 h-8 w-full rounded-md outline-none border-2 focus:border-amber-400 p-2"
								placeholder="Retype Password"
								type="password"
								value={retypedPassword}
								onChange={({ target }) => {
									setRetypedPassword(target.value);
									setErrorInForm({ status: false, message: "" });
								}}
							/>
							<button
								className="rounded-md bg-amber-400 px-4 py-2"
								type="submit"
								onClick={submitHandler}
							>
								Submit
							</button>
						</form>
						{errorInForm.status && (
							<p className="text-red-600 mt-4">{errorInForm.message}</p>
						)}
						<p>
							Already a user?{" "}
							<span
								className="w-full cursor-pointer text-blue-500"
								onClick={() => router.replace("/login")}
							>
								Log in
							</span>
						</p>
					</section>
				</div>
			</main>
		</>
	);
};

export default Signup;
