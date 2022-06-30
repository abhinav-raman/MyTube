import { firebaseApp } from "./firebase-config";
import { getDatabase, ref, set, get, child } from "firebase/database";

const database = getDatabase(firebaseApp);

export const createVideo = ({ videoUrl }: { videoUrl: any }) =>
	set(ref(database, "videos/" + videoUrl), {
		test: videoUrl,
	});

// export const getVideos = () => {
//   get(child(dbRef, `videos/${userId}`)).then((snapshot) => {
//     if (snapshot.exists()) {
//       console.log(snapshot.val());
//     } else {
//       console.log("No data available");
//     }
//   }).catch((error) => {
//     console.error(error);
//   });
// }
