import type { NextPage } from "next";
import { useContext, useState } from "react";
import { SideBarContext } from "../context/SidebarStateContext";
import axios from "axios";
import VideoTile from "../components/VideoFile";

const Create: NextPage = () => {
	const { isExpanded } = useContext(SideBarContext);
	const [videoUrl, setVideoUrl] = useState<string>("");
	const [verifiedVideo, setVerifiedVideo] = useState<any>(null);
	const [errorInVerifyingVideo, setErrorInVerifyingVideo] =
		useState<boolean>(false);

	const verifyHandler = async (event: any) => {
		if (videoUrl.length === 0) return;

		event.preventDefault();
		setErrorInVerifyingVideo(false);
		setVerifiedVideo(null);
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
	};

	return (
		<main
			className={`h-full p-2 pt-14 flex justify-center items-center transition-all ${
				isExpanded ? "ml-72" : "ml-12"
			}`}
		>
			<section className="w-96 bg-amber-100 p-4 text-center rounded-lg">
				<h2 className="w-full text-center mb-2 text-xl">Create Video</h2>
				{verifiedVideo !== null && errorInVerifyingVideo === false && (
					<>
						<div className="border-2 border-amber-400 p-2 rounded-md">
							<VideoTile
								videoId={verifiedVideo.id}
								videoData={verifiedVideo.snippet}
							/>
						</div>
						<p>Is this the video you&apos;re looking for?</p>
					</>
				)}
				{errorInVerifyingVideo && (
					<p>Cannot find the video. Please try again.</p>
				)}

				{verifiedVideo !== null && errorInVerifyingVideo === false && (
					<div className="w-full">
						<button
							className="rounded-md bg-amber-400 px-4 py-2"
							type="submit"
							onClick={() => setVerifiedVideo(null)}
						>
							No
						</button>
						<button
							className="rounded-md bg-amber-400 px-4 py-2 ml-2"
							type="submit"
						>
							Yes, Confirm
						</button>
					</div>
				)}
				{verifiedVideo === null && (
					<>
						<input
							className="mb-2 h-8 w-full rounded-md outline-none border-2 focus:border-amber-400 p-2"
							placeholder="Video link"
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
			</section>
		</main>
	);
};

export default Create;
