// import type { NextPage } from "next";
// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { SideBarContext } from "../context/SidebarStateContext";
// import VideoTile from "../components/VideoTile";
// import { useRouter } from "next/router";

import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { SideBarContext } from "../context/SidebarStateContext";

import BackArrow from "../components/ui/Navigation/BackArrow";
import { PrimaryButton, SecondaryButton } from "../components/ui/Button";
import axios from "axios";
import VideoTile from "../components/VideoTile";
import { ADD_VIDEO_TYPE, createVideo } from "../firebase/firebase-database";
import { User } from "firebase/auth";

// import BackIcon from "../assets/images/back-arrow.svg";
// import {
// 	ADD_VIDEO_TYPE,
// 	createPlaylist,
// 	createVideo,
// } from "../firebase/firebase-database";
// import { currentSignedInUser } from "../firebase/firebase-auth";
// import type { User } from "firebase/auth";
// import { PrimaryButton, SecondaryButton } from "../components/ui/Button";

// const Create: NextPage = () => {
// 	const { isExpanded } = useContext(SideBarContext);
// 	const [videoUrl, setVideoUrl] = useState<string>("");
// 	const [verifiedContent, setVerifiedContent] = useState<any>(null);
// 	const [errorInVerifyingVideo, setErrorInVerifyingVideo] =
// 		useState<boolean>(false);
// 	const [isLoading, setIsLoading] = useState<boolean>(false);
// 	const [isVideoCreated, setIsVideoCreated] = useState<boolean>(false);
// 	const [currentUser, setCurrentUser] = useState<User | null>(null);

// 	const router = useRouter();
// 	const CONTENT = router.query.content;

// 	useEffect(() => {
// 		currentSignedInUser((user: User) => {
// 			console.log(user);

// 			setCurrentUser(user);
// 		});
// 	}, []);

// 	const verifyHandler = async (event: any) => {
// 		if (videoUrl.length === 0) return;

// 		event.preventDefault();
// 		setIsLoading(true);
// 		try {
// 			const response = await axios.get(`api/youtube/${CONTENT}?id=${videoUrl}`);
// 			const { items } = response.data;
// 			console.log(response);
// 			if (items.length > 0) {
// 				setVerifiedContent(response.data.items[0]);
// 			} else {
// 				setErrorInVerifyingVideo(true);
// 			}
// 		} catch (error) {
// 			setErrorInVerifyingVideo(true);
// 			console.log(error);
// 		}
// 		setIsLoading(false);
// 	};

// 	const createVideoHandler = async () => {
// 		setIsLoading(true);
// 		try {
// 			const payload: ADD_VIDEO_TYPE = {
// 				id: verifiedContent.id,
// 				title: verifiedContent.snippet.title,
// 				dataAdded: new Date().toISOString(),
// 				addedBy: {
// 					email: currentUser && currentUser.email,
// 					uid: currentUser && currentUser.uid,
// 				},
// 			};
// 			const response = await createVideo(payload);
// 			setIsVideoCreated(true);
// 			console.log(response);
// 		} catch (error) {
// 			console.log(error);
// 		}
// 		setIsLoading(false);
// 	};

// 	const addPlaylistHandler = async () => {
// 		setIsLoading(true);
// 		try {
// 			const payload: ADD_VIDEO_TYPE = {
// 				id: verifiedContent.id,
// 				title: verifiedContent.snippet.title,
// 				dataAdded: new Date().toISOString(),
// 				addedBy: {
// 					email: currentUser && currentUser.email,
// 					uid: currentUser && currentUser.uid,
// 				},
// 			};
// 			const response = await createPlaylist(payload);
// 			setIsVideoCreated(true);
// 			console.log(response);
// 		} catch (error) {
// 			console.log(error);
// 		}
// 		setIsLoading(false);
// 	};

// 	return (
// 		<main
// 			className={`h-screen p-2 pt-[4.5rem] flex flex-col transition-all ${
// 				isExpanded ? "ml-64" : "ml-12"
// 			}`}
// 		>
// 			<div className="h-8">
// 				<button className="h-full aspect-square" onClick={() => router.back()}>
// 					<BackIcon
// 						alt="back"
// 						className="hover:-translate-x-1 transition-all"
// 					/>
// 				</button>
// 			</div>
// 			<div className="h-full pb-16 flex flex-col justify-center items-center">
// 				<section className="w-96 bg-gray-100 dark:bg-gray-700 p-4 text-center rounded-lg">
// 					<h2 className="w-full text-center mb-2 text-2xl font-bold text-black dark:text-white">
// 						{CONTENT === "video" &&
// 							(isVideoCreated ? "Video is added" : "Add Video")}
// 						{CONTENT === "playlist" &&
// 							(isVideoCreated ? "Playlist is added" : "Add Playlist")}
// 					</h2>

// 					{!isVideoCreated && verifiedContent === null && (
// 						<>
// 							<input
// 								className="mb-2 h-8 w-full rounded-md outline-none border-2 focus:border-sky-400 p-2"
// 								placeholder={`${
// 									CONTENT === "video" ? "Video" : "Playlist"
// 								} link`}
// 								type="url"
// 								value={videoUrl}
// 								onChange={({ target }) => setVideoUrl(target.value)}
// 							/>
// 							<div className="h-8">
// 								<PrimaryButton onClickHandler={() => verifyHandler} applyClasses="h-full">
// 									Verify
// 								</PrimaryButton>
// 							</div>
// 						</>
// 					)}

// 					{!isVideoCreated &&
// 						verifiedContent !== null &&
// 						errorInVerifyingVideo === false && (
// 							<div className="w-full">
// 								<VideoTile
// 									videoId={verifiedContent.id}
// 									videoData={verifiedContent.snippet}
// 								/>
// 								<p className="my-2 text-indigo-400 font-bold text-lg">
// 									Is this the video you&apos;re trying to add?
// 								</p>
// 							</div>
// 						)}

// 					{errorInVerifyingVideo && (
// 						<p className="my-2">
// 							Cannot find the {CONTENT === "playlist" ? "playlist" : "video"}.
// 							Please try again.
// 						</p>
// 					)}

// 					{!isVideoCreated &&
// 						verifiedContent !== null &&
// 						errorInVerifyingVideo === false && (
// 							<div className="w-full flex justify-center">
// 								<SecondaryButton
// 									onClickHandler={() =>
// 										isLoading ? null : setVerifiedContent(null)
// 									}
// 								>
// 									No
// 								</SecondaryButton>
// 								<PrimaryButton
// 									applyClasses="ml-2"
// 									onClickHandler={() =>
// 										isLoading
// 											? null
// 											: CONTENT === "video"
// 											? createVideoHandler()
// 											: addPlaylistHandler()
// 									}
// 								>
// 									Yes, confirm
// 								</PrimaryButton>
// 							</div>
// 						)}

// 					{isVideoCreated && (
// 						<>
// 							<h4 className="font-medium">
// 								Your video has been added successfully.
// 							</h4>
// 							{/* <p>Redirecting</p> */}
// 						</>
// 					)}
// 				</section>
// 			</div>
// 		</main>
// 	);
// };

// export default Create;

const AddVideo: NextPage = () => {
	const router = useRouter();
	const { isExpanded } = useContext(SideBarContext);
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	const [videoUrl, setVideoUrl] = useState<string>("");
	const [verifiedVideo, setVerifiedVideo] = useState<any>(null);
	const [error, setError] = useState<boolean>(false);
	const [isVerifiedVideoAdded, setIsVerifiedVideoAdded] = useState(false);

	const verifyVideoHandler = async () => {
		if (videoUrl.length === 0) return;

		// event.preventDefault();
		setError(false);
		try {
			const response = await axios.get(`api/youtube/video?id=${videoUrl}`);
			const { items } = response.data;
			console.log(response);
			if (items.length > 0) {
				setVerifiedVideo(response.data.items[0]);
			} else {
				setError(true);
			}
		} catch (error) {
			setError(true);
			console.log(error);
		}
	};

	const addVideoHandler = async () => {
		const payload: ADD_VIDEO_TYPE = {
			id: verifiedVideo.id,
			title: verifiedVideo.snippet.title,
			dataAdded: new Date().toISOString(),
			addedBy: {
				email: currentUser && currentUser.email,
				uid: currentUser && currentUser.uid,
			},
		};
		try {
			const response = await createVideo(payload);
			setIsVerifiedVideoAdded(true);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<main
			className={`h-screen p-2 pt-[4.5rem] flex flex-col transition-all ${
				isExpanded ? "ml-64" : "ml-12"
			}`}
		>
			<div className="h-8">
				<BackArrow />
			</div>

			<div className="h-full pb-16 flex flex-col justify-center items-center">
				<section className="w-96 bg-gray-100 dark:bg-gray-700 p-4 text-center rounded-lg">
					<h2 className="w-full text-center mb-2 text-2xl font-bold text-black dark:text-white">
						Add Video
					</h2>
					<section>
						{verifiedVideo ? (
							isVerifiedVideoAdded ? (
								<>
									<h4 className="font-medium text-sky-600">
										Your video has been added successfully.
									</h4>
								</>
							) : (
								<div>
									<VideoTile
										videoId={verifiedVideo.id}
										videoData={verifiedVideo.snippet}
									/>
									<p className="text-black dark:text-white font-bold mb-2">
										Is this the video you are looking for?
									</p>
									{error && (
										<p className="text-red-600 dark:text-red-400 font-medium mb-2">
											Cannot find the video, please verify the ID.
										</p>
									)}
									<div className="h-8 w-full">
										<PrimaryButton
											onClickHandler={addVideoHandler}
											applyClasses="h-full mr-2 px-4"
										>
											Yes, I Confirm
										</PrimaryButton>
										<SecondaryButton
											applyClasses="h-full"
											onClickHandler={() => setVerifiedVideo(null)}
										>
											No
										</SecondaryButton>
									</div>
								</div>
							)
						) : (
							<>
								<div className="w-full h-max">
									<input
										className="mb-2 h-8 w-full rounded-md outline-none border-2 focus:border-sky-400 p-2"
										placeholder={"Add Video ID"}
										name="id"
										value={videoUrl}
										onChange={({ target }) => setVideoUrl(target.value)}
									/>
								</div>
								{error && (
									<p className="text-red-600 dark:text-red-400 font-medium mb-2">
										Cannot find the video, please verify the ID.
									</p>
								)}

								<div className="w-full h-8">
									<PrimaryButton
										onClickHandler={verifyVideoHandler}
										applyClasses="h-full"
									>
										Verify
									</PrimaryButton>
								</div>
							</>
						)}
					</section>
				</section>
			</div>
		</main>
	);
};

export default AddVideo;
