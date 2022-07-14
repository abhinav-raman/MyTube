import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import VideoTile from "../components/VideoFile";
import { SideBarContext } from "../context/SidebarStateContext";
import { getVideos } from "../firebase/firebase-database";
import loaderIcon from "../assets/images/loader.svg";
import axios from "axios";

const Home: NextPage = () => {
	const { isExpanded } = useContext(SideBarContext);
	const router = useRouter();
	const [videoResponseList, setVideoResponseList] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const initialLoad = useRef<boolean>(false);

	const fetchVideoData = async (videoId: string) => {
		const response = await axios.get(
			`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.API_KEY}`
		);
		console.log("response", response.data.items);
		setVideoResponseList((prevData) => [...prevData, ...response.data.items]);
		setIsLoading(false);
	};

	const getAllVideosFromFirebase = async () => {
		setIsLoading(true);
		const videoResponse = await getVideos();
		if (videoResponse.exists()) {
			const videoResponseData: any = videoResponse.val();
			for (const videoObj in videoResponseData) {
				fetchVideoData(videoObj);
			}
		} else {
			console.log("No data available");
		}
	};

	useEffect(() => {
		if (initialLoad.current) return;

		initialLoad.current = true;
		getAllVideosFromFirebase();
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
							router.push({
								pathname: "/add",
								query: { content: "video" },
							})
						}
					>
						+ Add Video
					</button>
				</div>
				<div className="flex flex-wrap">
					{isLoading && (
						<div className="h-16 w-full">
							<div className="h-full aspect-square mx-auto">
								<Image
									src={loaderIcon}
									alt="loading"
									layout="responsive"
									className="animate-spin-2"
								/>
							</div>
						</div>
					)}
					{!isLoading &&
						videoResponseList &&
						videoResponseList.map((videoData: any) => (
							<div
								className="xl:w-[calc(25%-1rem)] md:w-[calc(33%-1rem)] sm:w-[calc(50%-1rem)] w-[calc(100%-1rem)] m-2 bg-amber-100 rounded-lg"
								key={videoData.id}
							>
								<VideoTile
									videoId={videoData.id}
									videoData={videoData.snippet}
								/>
							</div>
						))}
				</div>
			</main>

			<footer></footer>
		</>
	);
};

export default Home;
