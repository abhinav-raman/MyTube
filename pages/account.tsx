import axios from "axios";
import type { User } from "firebase/auth";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
// import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";
import PlaylistTileUser from "../components/playlist/PlaylistTile";
import VideoTileUser from "../components/video/VideoTileUser";
import { SideBarContext } from "../context/SidebarStateContext";
import { currentSignedInUser } from "../firebase/firebase-auth";
import {
	getPlaylistByUser,
	getVideoByUser,
} from "../firebase/firebase-database";

const Account: NextPage = () => {
	const { isExpanded } = useContext(SideBarContext);
	const router = useRouter();

	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [videoResponseList, setVideoResponseList] = useState<any[]>([]);
	const [playlistResponseList, setPlaylistResponseList] = useState<any[]>([]);

	const fetchVideoData = async (videoId: string) => {
		const response = await axios.get(
			`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.API_KEY}`
		);
		setVideoResponseList((prevData) => [...prevData, ...response.data.items]);
		setIsLoading(false);
	};

	const fetchPlaylistData = async (videoId: string) => {
		const response = await axios.get(
			`https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${videoId}&key=${process.env.API_KEY}`
		);
		setPlaylistResponseList((prevData: any) => [
			...prevData,
			...response.data.items,
		]);
		setIsLoading(false);
	};

	const getUserVideos = useCallback(async (userId: string) => {
		setIsLoading(true);
		const userVideos = await getVideoByUser(userId);
		if (userVideos.exists()) {
			const videoResponseData: any = userVideos.val();
			console.log(videoResponseData);
			for (const videoId in videoResponseData) {
				fetchVideoData(videoId);
			}
		} else {
			console.log("No data available");
		}
		setIsLoading(false);
	}, []);

	const getUserPlaylists = useCallback(async (userId: string) => {
		setIsLoading(true);
		const userPlaylists = await getPlaylistByUser(userId);
		if (userPlaylists.exists()) {
			const playlistResponseData: any = userPlaylists.val();
			console.log(playlistResponseData);
			for (const videoId in playlistResponseData) {
				fetchPlaylistData(videoId);
			}
		} else {
			console.log("No data available");
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		currentSignedInUser((user: User) => {
			console.log(user);

			if (!user) {
				router.replace("/login");
				return;
			}
			getUserVideos(user.uid);
			getUserPlaylists(user.uid);
			setCurrentUser(user);
		});
	}, [router, getUserVideos, getUserPlaylists]);

	return (
		<>
			<Head>
				<title>MyTube | Account</title>
			</Head>
			<main
				className={`h-full p-2 pt-[4.5rem] transition-all ${
					isExpanded ? "ml-64" : "ml-12"
				}`}
			>
				<div className="h-8 flex justify-between mb-4 mx-2">
					<h2 className="text-2xl font-bold text-black dark:text-white">
						Account
					</h2>
				</div>
				{currentUser && (
					<section>
						<div className="w-full">
							<div className="relative h-32 aspect-square m-auto">
								<Image
									src={currentUser.photoURL || ""}
									alt="profile"
									className="absolute rounded-full"
									layout="fill"
								/>
							</div>
							<div className="w-full">
								<h2 className="text-2xl text-center font-bold text-sky-600 dark:text-white mb-2">
									{currentUser.displayName}
								</h2>
								<h4 className="text-xl text-center font-semibold text-sky-600/75 dark:text-white/75">
									{currentUser.email}
								</h4>
							</div>
						</div>
					</section>
				)}
				<div className="w-full mb-4 mx-2">
					<h2 className="text-2xl font-bold text-black dark:text-white">
						Your Videos
					</h2>
					<div className="flex flex-wrap">
						{isLoading && <Loader />}
						{!isLoading &&
							videoResponseList &&
							videoResponseList.map((videoData: any) => (
								<div
									key={videoData.id}
									className="xl:w-1/4 md:w-1/3 sm:w-1/2 w-full"
								>
									<VideoTileUser
										key={videoData.id}
										videoId={videoData.id}
										videoData={videoData.snippet}
									/>
								</div>
							))}
					</div>
				</div>
				<div className="w-full mb-4 mx-2">
					<h2 className="text-2xl font-bold text-black dark:text-white">
						Your Playlists
					</h2>
					<div className="flex flex-wrap">
						{isLoading && <Loader />}
						{!isLoading &&
							playlistResponseList &&
							playlistResponseList.map((videoData: any) => (
								<div
									key={videoData.id}
									className="xl:w-1/4 md:w-1/3 sm:w-1/2 w-full"
								>
									<PlaylistTileUser
										key={videoData.id}
										playlistId={videoData.id}
										playlistData={videoData.snippet}
									/>
								</div>
							))}
					</div>
				</div>
			</main>
		</>
	);
};

export default Account;
