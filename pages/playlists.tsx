import { useContext, useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import PlaylistTile from "../components/playlist/PlaylistTile";
import { SideBarContext } from "../context/SidebarStateContext";
import { getPlaylists } from "../firebase/firebase-database";
import axios from "axios";
import Loader from "../components/Loader";
import { PrimaryButton } from "../components/ui/Button";

const Playlists: NextPage = () => {
	const { isExpanded } = useContext(SideBarContext);
	const router = useRouter();
	const [playlistResponseList, setPlaylistResponseList] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const initialLoad = useRef<boolean>(false);

	const fetchPlaylistData = async (videoId: string) => {
		const response = await axios.get(
			`https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${videoId}&key=${process.env.API_KEY}`
		);
		console.log("response", response.data.items);
		setPlaylistResponseList((prevData: any) => [
			...prevData,
			...response.data.items,
		]);
		setIsLoading(false);
	};

	const getAllPlaylistsFromFirebase = async () => {
		setIsLoading(true);
		const videoResponse = await getPlaylists();
		if (videoResponse.exists()) {
			const videoResponseData: any = videoResponse.val();
			for (const videoObj in videoResponseData) {
				fetchPlaylistData(videoObj);
			}
		} else {
			console.log("No data available");
		}
	};

	useEffect(() => {
		if (initialLoad.current) return;

		initialLoad.current = true;
		getAllPlaylistsFromFirebase();
	});

	return (
		<>
			<Head>
				<title>MyTube | Playlists</title>
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
						Playlists
					</h2>
					<PrimaryButton
						onClickHandler={() =>
							router.push({ pathname: "addPlaylist"})
						}
					>
						+ Add Playlist
					</PrimaryButton>
				</div>
				<div className="flex flex-wrap">
					{isLoading && <Loader />}
					{!isLoading &&
						playlistResponseList.length &&
						playlistResponseList.map((playlistData: any) => (
							<div
								key={playlistData.id}
								className="xl:w-1/4 md:w-1/3 sm:w-1/2 w-full"
							>
								<PlaylistTile
									playlistId={playlistData.id}
									playlistData={playlistData.snippet}
								/>
							</div>
						))}
				</div>
			</main>

			<footer></footer>
		</>
	);
};

export default Playlists;
