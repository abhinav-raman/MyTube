import { initializeApp } from "firebase/app";
const firebaseConfig = {
	apiKey: "AIzaSyBxUQZkCHcDnHcFDTEnJW17HWuBjWRswfw",
	authDomain: "with-firebase-a7373.firebaseapp.com",
	projectId: "with-firebase-a7373",
	storageBucket: "with-firebase-a7373.appspot.com",
	messagingSenderId: "221324567830",
	appId: "1:221324567830:web:a3dc91e17e8d27a8bcdc37",
	databaseURL: "https://with-firebase-a7373-default-rtdb.firebaseio.com",
};

export const firebaseApp = initializeApp(firebaseConfig);
