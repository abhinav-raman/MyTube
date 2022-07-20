import axios from "axios";
import { User } from "firebase/auth";
import { NextPage } from "next";
import { useContext, useState } from "react";
import { PrimaryButton, SecondaryButton } from "../components/ui/Button";
import BackArrow from "../components/ui/Navigation/BackArrow";
import PlaylistTile from "../components/PlaylistTile";
import { SideBarContext } from "../context/SidebarStateContext";
import { ADD_VIDEO_TYPE, createPlaylist } from "../firebase/firebase-database";

const AddPlaylist: NextPage = () => {
	const { isExpanded } = useContext(SideBarContext);
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	const [playlistUrl, setPlaylistUrl] = useState<string>("");
	const [verifiedPlaylist, setVerifiedPlaylist] = useState<any>(null);
	const [error, setError] = useState<boolean>(false);
	const [isVerifiedPlaylistAdded, setIsVerifiedPlaylistAdded] = useState(false);

	const verifyPlaylistHandler = async () => {
		if (playlistUrl.length === 0) return;

		setError(false);
		try {
			const response = await axios.get(`api/youtube/playlist?id=${playlistUrl}`);
			const { items } = response.data;
			console.log(response);
			if (items.length > 0) {
				setVerifiedPlaylist(response.data.items[0]);
			} else {
				setError(true);
			}
		} catch (error) {
			setError(true);
			console.log(error);
		}
	};

	const addPlaylistHandler = async () => {
		const payload: ADD_VIDEO_TYPE = {
			id: verifiedPlaylist.id,
			title: verifiedPlaylist.snippet.title,
			dataAdded: new Date().toISOString(),
			addedBy: {
				email: currentUser && currentUser.email,
				uid: currentUser && currentUser.uid,
			},
		};
		try {
			const response = await createPlaylist(payload);
			setIsVerifiedPlaylistAdded(true);
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
						Add Playlist
					</h2>
					<section>
						{verifiedPlaylist ? (
							isVerifiedPlaylistAdded ? (
								<>
									<h4 className="font-medium text-sky-600">
										Your playlist has been added successfully.
									</h4>
								</>
							) : (
								<div>
									<PlaylistTile
										playlistId={verifiedPlaylist.id}
										playlistData={verifiedPlaylist.snippet}
									/>
									<p className="text-black dark:text-white font-bold mb-2">
										Is this the playlist you are looking for?
									</p>
									{error && (
										<p className="text-red-600 dark:text-red-400 font-medium mb-2">
											Cannot find the playlist, please verify the ID.
										</p>
									)}
									<div className="h-8 w-full">
										<PrimaryButton
											onClickHandler={addPlaylistHandler}
											applyClasses="h-full mr-2 px-4"
										>
											Yes, I Confirm
										</PrimaryButton>
										<SecondaryButton
											applyClasses="h-full"
											onClickHandler={() => setVerifiedPlaylist(null)}
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
										placeholder={"Add Playlist ID"}
										name="id"
										value={playlistUrl}
										onChange={({ target }) => setPlaylistUrl(target.value)}
									/>
								</div>
								{error && (
									<p className="text-red-600 dark:text-red-400 font-medium mb-2">
										Cannot find the playlist, please verify the ID.
									</p>
								)}

								<div className="w-full h-8">
									<PrimaryButton
										onClickHandler={verifyPlaylistHandler}
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

export default AddPlaylist;
