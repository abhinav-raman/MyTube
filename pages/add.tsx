import type { NextPage } from "next";
import { useContext, useState } from "react";
import axios from "axios";
import { SideBarContext } from "../context/SidebarStateContext";
import VideoTile from "../components/VideoFile";
import Router, { useRouter } from "next/router";

import loader from "../assets/images/loader.svg";
import Image from "next/image";
import { createVideo } from "../firebase/firebase-database";

const FORM_STATES = {
	INITIAL: "initial",
	LOADING: "loading",
	VERIFIED_SUCCESS: "verifiedSuccess",
	ADDED_SUCCESS: "addedSuccess",
	FAILURE: "failure",
};

const Create: NextPage = () => {
	const { isExpanded } = useContext(SideBarContext);
	const [videoUrl, setVideoUrl] = useState<string>("");
	const [verifiedVideo, setVerifiedVideo] = useState<any>(null);
	const [errorInVerifyingVideo, setErrorInVerifyingVideo] =
		useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isVideoCreated, setIsVideoCreated] = useState<boolean>(false);

	const CONTENT = useRouter().query.content;

	const verifyHandler = async (event: any) => {
		if (videoUrl.length === 0) return;

		event.preventDefault();
		setIsLoading(true);
		try {
			const response = await axios.get(`api/youtube/video?id=${videoUrl}`);
			const { items } = response.data;
			console.log(response);
			if (items.length > 0) {
				setVerifiedVideo(response.data.items[0]);
			} else {
				setErrorInVerifyingVideo(true);
			}
		} catch (error) {
			setErrorInVerifyingVideo(true);
			console.log(error);
		}
		setIsLoading(false);
	};

	const createVideoHandler = async () => {
		setIsLoading(true);
		try {
			const response = await createVideo(verifiedVideo);
			setIsVideoCreated(true);
			console.log(response);
			// setTimeout(() => {
			// 	console.log(verifiedVideo);
			// 	setIsVideoCreated(true);
			// 	setIsLoading(false);
			// }, 1000);
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};

	return (
		<main
			className={`h-full p-2 pt-14 flex justify-center items-center transition-all ${
				isExpanded ? "ml-72" : "ml-12"
			}`}
		>
			<section className="w-96 bg-amber-100 p-4 text-center rounded-lg">
				<h2 className="w-full text-center mb-2 text-2xl font-bold text-indigo-600">
					{CONTENT === "video" &&
						(isVideoCreated ? "Video is added" : "Add Video")}
					{CONTENT === "playlist" &&
						(isVideoCreated ? "Playlist is added" : "Add Playlist")}
				</h2>

				{!isVideoCreated &&
					verifiedVideo !== null &&
					errorInVerifyingVideo === false && (
						<>
							<div className="border-2 border-amber-400 mb-2 p-2 rounded-md">
								<VideoTile
									videoId={verifiedVideo.id}
									videoData={verifiedVideo.snippet}
								/>
							</div>
							<p className="my-2 text-indigo-400 font-bold text-lg">
								Is this the video you&apos;re trying to add?
							</p>
						</>
					)}

				{errorInVerifyingVideo && (
					<p className="my-2">Cannot find the video. Please try again.</p>
				)}

				{!isVideoCreated &&
					verifiedVideo !== null &&
					errorInVerifyingVideo === false && (
						<div className="w-full flex justify-center">
							<button
								className="rounded-md bg-amber-400 px-4 py-2"
								type="submit"
								onClick={() => (isLoading ? null : setVerifiedVideo(null))}
							>
								No
							</button>
							<button
								className="rounded-md bg-amber-400 px-4 py-2 ml-2 relative"
								type="submit"
								onClick={() => (isLoading ? null : createVideoHandler())}
							>
								{isLoading ? (
									<div className="relative h-6 w-12">
										<Image
											className="animate-spin-2"
											src={loader}
											layout="fill"
											alt="loader"
										/>
									</div>
								) : (
									"Yes, confirm"
								)}
							</button>
						</div>
					)}

				{!isVideoCreated && verifiedVideo === null && (
					<>
						<input
							className="mb-2 h-8 w-full rounded-md outline-none border-2 focus:border-amber-400 p-2"
							placeholder={`${CONTENT === "video" ? "Video" : "Playlist"} link`}
							type="url"
							value={videoUrl}
							onChange={({ target }) => setVideoUrl(target.value)}
						/>
						<button
							className="rounded-md bg-amber-400 px-4 py-2"
							type="submit"
							onClick={verifyHandler}
						>
							Verify
						</button>
					</>
				)}

				{isVideoCreated && (
					<>
						<h4 className="font-medium">
							Your video has been added successfully.
						</h4>
						{/* <p>Redirecting</p> */}
					</>
				)}
			</section>
		</main>
	);
};

export default Create;