import { firebaseApp } from "./firebase-config";
import { getDatabase, ref, set, get, child } from "firebase/database";

const database = getDatabase(firebaseApp);
const detabaseRef = ref(getDatabase(firebaseApp));

export const createVideo = (videoData: any) =>
	set(ref(database, "videos/" + videoData.id), {
		...videoData,
	});

export const getVideos = () => get(child(detabaseRef, `videos/`));

export const getPlaylists = () => get(child(detabaseRef, `playlsits/`));
