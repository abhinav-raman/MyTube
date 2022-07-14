import { firebaseApp } from "./firebase-config";
import {
	getDatabase,
	ref,
	set,
	get,
	child,
	query,
	equalTo,
	orderByChild,
} from "firebase/database";

const database = getDatabase(firebaseApp);
const detabaseRef = ref(getDatabase(firebaseApp));

export type ADD_VIDEO_TYPE = {
	id: string;
	title: string;
	dataAdded: string;
	addedBy: { uid: string | null; email: string | null };
};

export const createVideo = (videoData: ADD_VIDEO_TYPE) =>
	set(ref(database, "videos/" + videoData.id), {
		...videoData,
	});

export const createPlaylist = (playlistData: any) =>
	set(ref(database, "playlists/" + playlistData.id), {
		...playlistData,
	});

export const getVideos = () => get(child(detabaseRef, `videos/`));

export const getPlaylists = () => get(child(detabaseRef, `playlists/`));

export const getVideoByUser = (userId: string) =>
	get(
		query(
			ref(database, "videos/"),
			orderByChild("addedBy/uid"),
			equalTo(userId)
		)
	);

export const getPlaylistByUser = (userId: string) =>
	get(
		query(
			ref(database, "playlists/"),
			orderByChild("addedBy/uid"),
			equalTo(userId)
		)
	);
