import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import VideoTile from "../components/VideoFile";
import { SideBarContext } from "../context/SidebarStateContext";
import { getVideos } from "../firebase/firebase-database";
import loaderIcon from "../assets/images/loader.svg";

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
				className={`h-full p-2 pt-[4.5rem] transition-all ${
					isExpanded ? "ml-64" : "ml-12"
				}`}
			>
				<div className="h-8 flex justify-between mb-4 mx-2">
					<h2 className="text-2xl font-bold text-yellow-800">Videos</h2>
					<button
						className="h-8 px-2 rounded-md bg-yellow-600 hover:bg-yellow-600/75 text-white shadow-lg shadow-yellow-400/75"
						onClick={() =>
							router.push(
								{
									pathname: "/add",
									query: { content: "video" },
								},
								{ pathname: "add-video" }
							)
						}
					>
						+ Add Video
					</button>
				</div>
				<div className="flex flex-wrap">
					{isLoading && (
						<div className="h-16 w-full">
							<div className="h-full aspect-square mx-auto">
								<Image src={loaderIcon} alt="loading" layout="responsive" className="animate-spin-2" />
							</div>
						</div>
					)}
					{!isLoading &&
						videosObj &&
						Object.entries(videosObj).map(
							([id, data]: [id: string, data: any]) => (
								<div
									className="w-[calc(25%-1rem)] m-2 bg-amber-100 rounded-lg"
									key={id}
								>
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
