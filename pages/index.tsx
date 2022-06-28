import type { NextPage } from "next";
import Head from "next/head";

import { app } from "../firebase/firebase-config";

const Home: NextPage = () => {
	console.log(app);

	return (
		<>
			<Head>
				<title>Youtube | Home</title>
				<meta name="description" content="Youtube app using firebase and NextJS" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="pt-12 ml-72">Hello World</main>

			<footer></footer>
		</>
	);
};

export default Home;
