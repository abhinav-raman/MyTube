import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import PlaylistTile from "../components/PlaylistTile";
import { SideBarContext } from "../context/SidebarStateContext";
import { getPlaylists } from "../firebase/firebase-database";
import LoaderIcon from "../assets/images/loader.svg";
import axios from "axios";

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
					<h2 className="text-2xl font-bold text-sky-800 dark:text-white">
						Playlists
					</h2>
					<button
						className="h-8 px-2 rounded-md bg-sky-600 hover:bg-sky-600/75 text-white shadow-lg"
						onClick={() =>
							router.push({ pathname: "add/", query: { content: "playlist" } })
						}
					>
						+ Add Playlist
					</button>
				</div>
				<div className="flex flex-wrap">
					{isLoading && (
						<div className="h-16 w-full">
							<div className="h-full aspect-square mx-auto">
								<LoaderIcon alt="loading" className="animate-spin-2" />
							</div>
						</div>
					)}
					{!isLoading &&
						playlistResponseList.length &&
						playlistResponseList.map((playlistData: any) => (
							<div
								className="xl:w-[calc(25%-1rem)] md:w-[calc(33%-1rem)] sm:w-[calc(50%-1rem)] m-2 bg-amber-100 rounded-lg"
								key={playlistData.id}
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
