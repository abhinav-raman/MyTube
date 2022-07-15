import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SideBarContext } from "../context/SidebarStateContext";
import VideoTile from "../components/VideoFile";
import { useRouter } from "next/router";

// import Image from "next/image";
import LoaderIcon from "../assets/images/loader.svg";
import BackIcon from "../assets/images/back-arrow.svg";
import {
	ADD_VIDEO_TYPE,
	createPlaylist,
	createVideo,
} from "../firebase/firebase-database";
import { currentSignedInUser } from "../firebase/firebase-auth";
import type { User } from "firebase/auth";

const Create: NextPage = () => {
	const { isExpanded } = useContext(SideBarContext);
	const [videoUrl, setVideoUrl] = useState<string>("");
	const [verifiedContent, setVerifiedContent] = useState<any>(null);
	const [errorInVerifyingVideo, setErrorInVerifyingVideo] =
		useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isVideoCreated, setIsVideoCreated] = useState<boolean>(false);
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	const router = useRouter();
	const CONTENT = router.query.content;

	useEffect(() => {
		currentSignedInUser((user: User) => {
			console.log(user);

			setCurrentUser(user);
		});
	}, []);

	const verifyHandler = async (event: any) => {
		if (videoUrl.length === 0) return;

		event.preventDefault();
		setIsLoading(true);
		try {
			const response = await axios.get(`api/youtube/${CONTENT}?id=${videoUrl}`);
			const { items } = response.data;
			console.log(response);
			if (items.length > 0) {
				setVerifiedContent(response.data.items[0]);
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
			const payload: ADD_VIDEO_TYPE = {
				id: verifiedContent.id,
				title: verifiedContent.snippet.title,
				dataAdded: new Date().toISOString(),
				addedBy: {
					email: currentUser && currentUser.email,
					uid: currentUser && currentUser.uid,
				},
			};
			const response = await createVideo(payload);
			setIsVideoCreated(true);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};

	const addPlaylistHandler = async () => {
		setIsLoading(true);
		try {
			const payload: ADD_VIDEO_TYPE = {
				id: verifiedContent.id,
				title: verifiedContent.snippet.title,
				dataAdded: new Date().toISOString(),
				addedBy: {
					email: currentUser && currentUser.email,
					uid: currentUser && currentUser.uid,
				},
			};
			const response = await createPlaylist(payload);
			setIsVideoCreated(true);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};

	return (
		<main
			className={`h-screen p-2 pt-[4.5rem] flex flex-col transition-all ${
				isExpanded ? "ml-64" : "ml-12"
			}`}
		>
			<div className="h-8">
				<button className="h-full aspect-square" onClick={() => router.back()}>
					<BackIcon
						alt="back"
						className="hover:-translate-x-1 transition-all"
					/>
				</button>
			</div>
			<div className="h-full pb-16 flex flex-col justify-center items-center">
				<section className="w-96 bg-amber-100 p-4 text-center rounded-lg">
					<h2 className="w-full text-center mb-2 text-2xl font-bold text-indigo-600">
						{CONTENT === "video" &&
							(isVideoCreated ? "Video is added" : "Add Video")}
						{CONTENT === "playlist" &&
							(isVideoCreated ? "Playlist is added" : "Add Playlist")}
					</h2>

					{!isVideoCreated &&
						verifiedContent !== null &&
						errorInVerifyingVideo === false && (
							<>
								<div className="border-2 border-amber-400 mb-2 p-2 rounded-md">
									<VideoTile
										videoId={verifiedContent.id}
										videoData={verifiedContent.snippet}
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
						verifiedContent !== null &&
						errorInVerifyingVideo === false && (
							<div className="w-full flex justify-center">
								<button
									className="rounded-md bg-amber-400 px-4 py-2"
									type="submit"
									onClick={() => (isLoading ? null : setVerifiedContent(null))}
								>
									No
								</button>
								<button
									className="rounded-md bg-amber-400 px-4 py-2 ml-2 relative"
									type="submit"
									onClick={() =>
										isLoading
											? null
											: CONTENT === "video"
											? createVideoHandler()
											: addPlaylistHandler()
									}
								>
									{isLoading ? (
										<div className="relative h-6 w-12">
											<LoaderIcon
												className="animate-spin-2"
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

					{!isVideoCreated && verifiedContent === null && (
						<>
							<input
								className="mb-2 h-8 w-full rounded-md outline-none border-2 focus:border-amber-400 p-2"
								placeholder={`${
									CONTENT === "video" ? "Video" : "Playlist"
								} link`}
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
			</div>
		</main>
	);
};

export default Create;
