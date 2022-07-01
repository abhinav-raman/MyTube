import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import VideoTile from "../components/VideoFile";
import { SideBarContext } from "../context/SidebarStateContext";
import { getVideos } from "../firebase/firebase-database";

const Home: NextPage = () => {
	const { isExpanded } = useContext(SideBarContext);
	const router = useRouter();
	const [videosObj, setVideosObj] = useState<any>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const initialLoad = useRef<boolean>(false);

	const getAllVideos = async () => {
		setIsLoading(true);
		const videoResponse = await getVideos();
		if (videoResponse.exists()) {
			console.log(videoResponse.val());
			setVideosObj(videoResponse.val());
		} else {
			console.log("No data available");
		}
		setIsLoading(false);
	};

	useEffect(() => {
		if (initialLoad.current) return;

		initialLoad.current = true;
		getAllVideos();
	});

	return (
		<>
			<Head>
				<title>MyTube | Home</title>
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
						onClick={() => router.push("/add")}
					>
						+ Add Video
					</button>
				</div>
				<div className="flex flex-wrap">
					{isLoading && <p>Loading</p>}
					{!isLoading &&
						videosObj &&
						Object.entries(videosObj).map(
							([id, data]: [id: string, data: any]) => (
								<div className="w-[calc(25%-1rem)] m-2" key={id}>
									<VideoTile videoId={id} videoData={data.snippet} />
								</div>
							)
						)}
				</div>
			</main>

			<footer></footer>
		</>
	);
};

export default Home;
