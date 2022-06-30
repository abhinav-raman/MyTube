import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { SideBarContext } from "../context/SidebarStateContext";

const Home: NextPage = () => {
	const { isExpanded } = useContext(SideBarContext);
	const router = useRouter();

	const createVideoHandler = () => {};

	return (
		<>
			<Head>
				<title>Youtube | Home</title>
				<meta
					name="description"
					content="Youtube app using firebase and NextJS"
				/>
			</Head>

			<main
				className={`h-full p-2 pt-14 transition-all ${
					isExpanded ? "ml-72" : "ml-12"
				}`}
			>
				<div className="h-8 flex justify-between">
					<h2 className="text-2xl font-bold">Videos</h2>
					<button
						className="h-8 px-2 rounded-md border-2 border-amber-600 hover:border-amber-200"
						onClick={() => router.push("/create")}
					>
						+ Create
					</button>
				</div>
			</main>

			<footer></footer>
		</>
	);
};

export default Home;
