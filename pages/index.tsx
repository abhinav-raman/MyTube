import { useCallback, useContext, useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";

import VideoTile from "../components/VideoTile";
import { SideBarContext } from "../context/SidebarStateContext";
import { getVideos } from "../firebase/firebase-database";
import Loader from "../components/Loader";
import { PrimaryButton } from "../components/ui/Button";

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
		console.log(response.data.items[0]);
		setVideoResponseList((prevData) => [...prevData, ...response.data.items]);
		setIsLoading(false);
	};

	const getAllVideosFromFirebase = useCallback(async () => {
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
	}, []);

	useEffect(() => {
		if (initialLoad.current) return;

		initialLoad.current = true;
		getAllVideosFromFirebase();
	}, [getAllVideosFromFirebase]);

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
					<h2 className="text-2xl font-bold text-black dark:text-white">
						Videos
					</h2>
					<PrimaryButton
						onClickHandler={() =>
							router.push({
								pathname: "/add",
								query: { content: "video" },
							})
						}
					>
						+ Add Video
					</PrimaryButton>
				</div>
				<div className="flex flex-wrap">
					{isLoading && <Loader />}
					{!isLoading &&
						videoResponseList &&
						videoResponseList.map((videoData: any) => (
							<div
								key={videoData.id}
								className="xl:w-1/4 md:w-1/3 sm:w-1/2 w-full"
							>
								<VideoTile
									videoId={videoData.id}
									videoData={videoData.snippet}
								/>
							</div>
						))}
				</div>
			</main>
		</>
	);
};

export default Home;
