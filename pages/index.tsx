import type { NextPage } from "next";
import Head from "next/head";
import { useContext, useEffect } from "react";
import { SideBarContext } from "../context/SidebarStateContext";

const Home: NextPage = () => {
	const { isExpanded } = useContext(SideBarContext);

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
				className={`pt-12 transition-all ${isExpanded ? "ml-72" : "ml-12"}`}
			>
				Hello World
			</main>

			<footer></footer>
		</>
	);
};

export default Home;
