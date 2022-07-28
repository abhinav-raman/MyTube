import { NextPage } from "next";
import { useContext, useState } from "react";
import { SideBarContext } from "../context/SidebarStateContext";

import BackArrow from "../components/ui/Navigation/BackArrow";
import { PrimaryButton, SecondaryButton } from "../components/ui/Button";
import axios from "axios";
import VideoTile from "../components/video/VideoTile";
import { ADD_CONTENT_TYPE, createVideo } from "../firebase/firebase-database";
import { User } from "firebase/auth";
import Head from "next/head";

const AddVideo: NextPage = () => {
	const { isExpanded } = useContext(SideBarContext);
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	const [videoUrl, setVideoUrl] = useState<string>("");
	const [verifiedVideo, setVerifiedVideo] = useState<any>(null);
	const [error, setError] = useState<boolean>(false);
	const [isVerifiedVideoAdded, setIsVerifiedVideoAdded] = useState(false);

	const verifyVideoHandler = async () => {
		if (videoUrl.length === 0) return;

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
		const payload: ADD_CONTENT_TYPE = {
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
		<>
      <Head>
        <title>
          MyTube | Add Video
        </title>
      </Head>

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
											name="video-id"
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
		</>
	);
};

export default AddVideo;
