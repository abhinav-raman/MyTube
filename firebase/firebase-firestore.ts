import { firebaseApp } from "./firebase-config";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firestoreDB = getFirestore(firebaseApp);

export const fireStoreVideos = () => {
	try {
		getDocs(collection(firestoreDB, "videos")).then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				console.log(`${doc.id} => ${doc.data()}`);
			});
			return querySnapshot;
		});
	} catch (error) {
		console.log(error);

		return error;
	}
};
